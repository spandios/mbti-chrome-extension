import React from "react";
import { KEMI_VALUE } from "../constant/kemi";
import { useAppStore } from "../store/app.store";
import AddFriends from "./AddFreinds";

const FriendList = () => {
  const { userInfo, friends, setSelectedFriend, changeMenu } = useAppStore();
  if (!friends?.length) {
    return null;
  }

  return (
    <div className="flex flex-col">
      {friends.map((f, index) => (
        <div
          onClick={() => {
            setSelectedFriend(f);
            changeMenu("KEMI_DETAIL");
          }}
          className="flex gap-4 bg-white px-4 py-2 rounded-lg shadow hover:shadow-md hover:scale-105 transition-all duration-200 mb-4"
          key={`f-${index}`}
        >
          <img
            className="w-[94px] h-[94px] rounded-full"
            src={chrome.runtime.getURL(`images/${f.mbti.toLowerCase()}.png`)}
          />
          <div className={"flex-col justify-items-start"}>
            <p className="text-primary text-[16px] font-semibold mt-3">
              {f.mbti}
            </p>
            <p className="text-[#111518] text-[14px] font-normal">{f.name}</p>

            <div className={"flex items-center"}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="red"
                className={"mr-1"}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="text-red-500">
                케미 점수 : {KEMI_VALUE[userInfo?.mbti][f.mbti].total}
              </span>
            </div>
          </div>
        </div>
      ))}

      <AddFriends
        onAddFriends={(f) => {
          console.log("ADD FRIENDS", f);
          addFriends(f);
          // addFriends(f);
        }}
      />
    </div>
  );
};

export default FriendList;
