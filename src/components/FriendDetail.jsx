import React, { useEffect } from "react";
import { useAppStore } from "../store/app.store";
import { KemiDetail } from "./friend-detail/KemiDetail";
import MbtiDetail from "./friend-detail/MbtiDetail";

const FriendDetail = () => {
  const [tab, setTab] = React.useState(0);
  const { userInfo, selectedFriend } = useAppStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!selectedFriend) {
    return null;
  }

  return (
    <div>
      {/* tab */}
      <div className={"flex border-b mb-4"}>
        <button
          onClick={() => setTab(0)}
          className={`text-base font-medium ${
            tab === 0
              ? "text-blue-500 border-b-2 border-blue-500 font-bold"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          우리의 궁합
        </button>
        <button
          onClick={() => setTab(1)}
          className={`text-base px-4 py-2 font-medium ${
            tab === 1
              ? "text-blue-600 border-b-2 border-blue-600 font-bold"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {selectedFriend.mbti.toUpperCase()} 더 알아보기
        </button>
      </div>

      {/* content */}
      {tab === 0 ? <KemiDetail /> : <MbtiDetail mbti={selectedFriend.mbti} />}
    </div>
  );
};

export default FriendDetail;
