import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase';

// user_id, email, mbti, name
export async function findMyInfo(userInfo) {
    const { email, user_id } = userInfo;
    const docRef = await collection(db, 'users').where('user_id', '==', user_id).get();
    if (docRef.empty) {
        console.log('No matching documents.');
        return;
    }
    return docRef.docs.map((doc) => doc.data());
}

export async function saveMyInfo(userInfo, mbti) {
    const { email, user_id } = userInfo;
    const existingUser = await collection(db, 'users').where('user_id', '==', user_id).get();
    if (existingUser.empty) {
      const docRef = await addDoc(collection(db, 'users'), {
        user_id,
        email,
        mbti,
      });
        console.log('Document written with ID: ', docRef.id);
    }else{
      // update
        existingUser.docs.map((doc) => {
            const data = doc.data();
            data.mbti = mbti;
        });
    }
    return {...userInfo, mbti};

}

/**
 * userInfo => {email, user_id} chrome.identity.getProfileUserInfo
 * friends => {name, mbti}
 * @param user
 * @param friend
 * @returns {Promise<void>}
 */
export async function addFriends(user, friend) {
  const docRef = await addDoc(collection(db, 'friends'), {
    user,
    friend,
  });
  console.log('Document written with ID: ', docRef.id);
}

export async function getFriends(user) {
  const docRef = await collection(db, 'friends')
    .where('user.user_id', '==', user.user_id)
    .get();
  if (docRef.empty) {
    console.log('No matching documents.');
    return;
  }
  return docRef.docs.map((doc) => doc.data());
}

export async function deleteFriendById(user, friendId) {
  const docRef = await collection(db, 'friends')
    .where('user.user_id', '==', user.user_id)
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

export async function updateFriendById(user, friendId, friend) {
  const docRef = await collection(db, 'friends')
    .where('user.user_id', '==', user.user_id)
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

