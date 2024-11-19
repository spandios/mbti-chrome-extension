import { ArrowLeft } from "lucide-react";
import React from "react";
import { useAppStore } from "../store/app.store";
import FriendHeader from "./friend-detail/FriendHeader";

const Logo = () => (
  <div className="text-center mb-4 ml-2">
    <div className="inline-block">
      <div className="flex items-center gap-1">
        <span className="text-xl text-primary">MBTI KEMI</span>
      </div>
    </div>
  </div>
);

const Header = () => {
  const { currentMenu, selectedFriend, changeMenu } = useAppStore();

  const isDetail =
    currentMenu === "KEMI_DETAIL" || currentMenu === "ADD_FRIENDS";

  if (currentMenu === "KEMI_DETAIL") {
    return <FriendHeader />;
  }

  return (
    <div className={"flex justify-between items-center p-2"}>
      {isDetail ? (
        <ArrowLeft
          size={24}
          onClick={() => {
            changeMenu("HOME");
          }}
          className={"cursor-pointer"}
        />
      ) : (
        <Logo />
      )}

      {/* <div className="flex gap-4">
        <div className={"circle"}>efaew</div>
      </div> */}
    </div>
  );
};

export default Header;
