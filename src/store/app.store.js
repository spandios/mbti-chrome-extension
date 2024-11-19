import { create } from "zustand";
import { addFriends, deleteFriendById } from "../API";

export const MENUS = ["HOME", "KEMI_DETAIL", "ADD_FRIENDS"];

export const useAppStore = create((set, get) => ({
  currentMenu: "HOME",
  userInfo: null,
  friends: [],
  selectedFriend: null,

  changeMenu: (menu) => set({ currentMenu: menu }),
  setUserInfo: (userInfo) => set({ userInfo }),
  setFriends: (friends) => set({ friends }),
  setSelectedFriend: (friend) => set({ selectedFriend: friend }),
  addFriends: async (friend) => {
    try {
      const { userInfo, friends } = get();
      await addFriends(userInfo.user_id, friend);
      set({ friends: [...friends, friend] });
    } catch (e) {
      console.error(e);
    }
  },
  removeFriends: async (friend) => {
    const { userInfo, friends } = get();
    const r = await deleteFriendById(userInfo.user_id, friend);
    console.log("r", r);
    set({
      friends: friends.filter(
        (f) => f.name !== friend.name && f.mbti !== friend.mbti
      ),
    });
  },
}));
