import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { setStorageData } from "./ChromeAPI";
import { db } from "./firebase";

//id, email, mbti, name
export async function findMyInfo(userInfo) {
  const { email, user_id, id } = userInfo;
  const docRef = await collection(db, "users")
    .where("user_id", "==", user_id || id)
    .get();
  if (docRef.empty) {
    console.log("No matching documents.");
    return;
  }
  return docRef.docs.map((doc) => doc.data());
}

export async function saveMyInfo(userInfo, mbti) {
  const { email, user_id, id } = userInfo;
  const q = query(
    collection(db, "users"),
    where("user_id", "==", user_id || id)
  );
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    const docRef = await addDoc(collection(db, "users"), {
      user_id,
      email,
      mbti,
    });
    console.log("Document written with ID: ", docRef.id);
  } else {
    const doc = querySnapshot.docs[0]; // 첫 번째 문서 가져오기
    const data = doc.data();
    data.mbti = mbti;
    await updateDoc(doc.ref, data);
    console.log("Document updated");
  }

  await setStorageData("user", { email, user_id: user_id || id, mbti });
  return { email, user_id: user_id || id, mbti };
}

/**
 * userInfo => {email, user_id} chrome.identity.getProfileUserInfo
 * friends => {name, mbti}
 * @param user_id
 * @param friend
 * @returns {Promise<void>}
 */
export async function addFriends(user_id, friend) {
  if (!user_id || !friend) {
    throw new Error("user_id or friend is required");
  }
  const q = await query(
    collection(db, "friends"),
    where("user_id", "==", user_id)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    const docRef = await addDoc(collection(db, "friends"), {
      user_id,
      friends: [friend],
    });
    console.log("Document written with ID: ", docRef.id);
  } else {
    const doc = querySnapshot.docs[0]; // 첫 번째 문서 가져오기
    const data = doc.data();
    const updatedFriends = [...data.friends, friend]; // 새 배열 생성

    // 문서 업데이트
    await updateDoc(doc.ref, {
      friends: updatedFriends,
    });
  }

  return friend;
}

export async function getFriends(user_id) {
  const q = query(collection(db, "friends"), where("user_id", "==", user_id));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return [];
  }

  const f = querySnapshot.docs.map((doc) => doc.data())[0];
  return f.friends;
}

export async function deleteFriendById(user_id, friend) {
  const q = query(collection(db, "friends"), where("user_id", "==", user_id));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("No matching documents.");
    return;
  }
  const doc = querySnapshot.docs[0]; // 첫 번째 문서 가져오기
  const data = doc.data();
  data.friends = data.friends.filter(
    (f) => f.name !== friend.name && f.mbti !== friend.mbti
  );

  await updateDoc(doc.ref, data);
}

export async function updateFriendById(user_id, originalFriend, updatedFriend) {
  const q = query(collection(db, "friends"), where("user_id", "==", user_id));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("No matching documents.");
    return;
  }
  const doc = querySnapshot.docs[0]; // 첫 번째 문서 가져오기
  const data = doc.data();
  data.friends = data.friends.map((f) => {
    if (f.name === originalFriend.name && f.mbti === originalFriend.mbti) {
      return updatedFriend;
    }
    return f;
  });

  await updateDoc(doc.ref, data);
}
