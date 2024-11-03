import {collection, query, where, getDocs, addDoc} from 'firebase/firestore';
import {db} from './firebase';
import {setStorageData} from "./ChromeAPI";

//id, email, mbti, name
export async function findMyInfo(userInfo) {
    const {email, user_id, id} = userInfo;
    const docRef = await collection(db, 'users').where('user_id', '==', user_id || id).get();
    if (docRef.empty) {
        console.log('No matching documents.');
        return;
    }
    return docRef.docs.map((doc) => doc.data());
}

export async function saveMyInfo(userInfo, mbti) {
    const {email, user_id, id} = userInfo;
    const q = query(collection(db, 'users'), where('user_id', '==', user_id || id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        const docRef = await addDoc(collection(db, 'users'), {
            user_id,
            email,
            mbti,
        });
        console.log('Document written with ID: ', docRef.id);
    } else {
        querySnapshot.docs.map((doc) => {
            const data = doc.data();
            data.mbti = mbti;
        });
        console.log('Document updated');
    }

    await setStorageData('user', {email, user_id, mbti});
    return {email, user_id, mbti};

}

/**
 * userInfo => {email, user_id} chrome.identity.getProfileUserInfo
 * friends => {name, mbti}
 * @param user_id
 * @param friend
 * @returns {Promise<void>}
 */
export async function addFriends(user_id, friend) {
    if(!user_id || !friend) {
        throw new Error('user_id or friend is required');
    }
    const q = await query(collection(db, 'friends'), where('user_id', '==', user_id));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        const docRef = await addDoc(collection(db, 'friends'), {
            user_id,
            friends: [friend],
        });
    }else{
        querySnapshot.docs.map((doc) => {
            const data = doc.data();
            data.friends.push(friend);
        });
    }

    return friend

}

export async function getFriends(user_id) {
    const q = query(collection(db, 'friends'), where('user_id', '==', user_id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        return [];
    }

    const f =  querySnapshot.docs.map((doc) => doc.data())[0];
    return f.friends;
}

export async function deleteFriendById(user_id, friendId) {
    const docRef = await collection(db, 'friends')
        .where('user.user_id', '==', user_id)
        .get();
    if (docRef.empty) {
        console.log('No matching documents.');
        return;
    }
    docRef.docs.map((doc) => {
        const data = doc.data();
        data.friends = data.friends.filter((friend) => friend.user_id !== friendId);
    });
}

export async function updateFriendById(user_id, friendId, friend) {
    const docRef = await collection(db, 'friends')
        .where('user.user_id', '==', user_id)
        .get();
    if (docRef.empty) {
        console.log('No matching documents.');
        return;
    }
    docRef.docs.map((doc) => {
        const data = doc.data();
        data.friends = data.friends.map((f) => {
            if (f.user_id === friendId) {
                return friend;
            }
            return f;
        });
    });
}

