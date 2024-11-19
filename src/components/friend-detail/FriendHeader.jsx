import { ArrowLeft } from "lucide-react";
import React from "react";
import { MBTI } from "../../constant/mbti";
import { useAppStore } from "../../store/app.store";

const FriendHeader = () => {
  const { selectedFriend, setSelectedFriend, changeMenu, removeFriends } =
    useAppStore();

  async function onHandleRemoveFriend() {
    try {
      await removeFriends(selectedFriend);
      changeMenu("HOME");
    } catch (e) {
      console.error(e);
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    }
  }

  if (!selectedFriend) {
    return null;
  }
  return (
    <div className="relative bg-white h-[300px]">
      <div className="bg-gradient-to-r from-amber-400 to-amber-500 w-full h-[250px] text-white flex flex-col items-center justify-center relative">
        <ArrowLeft
          size={24}
          onClick={() => {
            changeMenu("HOME");

            setTimeout(() => {
              setSelectedFriend(null);
              console.log("CURRENT MENU", currentMenu);
            }, 100);
          }}
          className={"cursor-pointer absolute left-4 top-4"}
        />

        <div
          className="absolute right-4 top-4 cursor-pointer"
          onClick={onHandleRemoveFriend}
        >
          삭제
        </div>

        <img
          className="w-[100px] h-[100px] rounded-full absolute bottom-[-50px] z-10 left-4"
          src={chrome.runtime.getURL(
            `images/${selectedFriend.mbti.toLowerCase()}.png`
          )}
        />

        <div className="text-2xl font-bold">
          {selectedFriend.mbti?.toUpperCase()} -{" "}
          {MBTI[selectedFriend.mbti].description}
        </div>
        <div className="text-xl font-semibold mt-2">{selectedFriend.name}</div>

        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {MBTI[selectedFriend.mbti].hashtags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-bold hover:scale-105 transition-all duration-300 hover:bg-white/40 cursor-pointer"
            >
              # {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendHeader;
