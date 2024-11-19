import React, { useState } from "react";
import { MBTI } from "../constant/mbti";
import { useAppStore } from "../store/app.store";
import Button from "./ui/Button";

const AddFriends = () => {
  const { addFriends } = useAppStore();
  const [visibleInput, setVisibleInput] = useState(false);
  const [friends, setFriends] = useState();

  if (!visibleInput) {
    return (
      <Button
        className={"bg-primary text-white font-bold"}
        onClick={() => setVisibleInput(true)}
      >
        MBTI 친구 추가
      </Button>
    );
  }

  const onHandleAddFriends = () => {
    if (!friends.name) {
      alert("이름을 입력해주세요");
      return;
    }

    if (!MBTI[friends.mbti]) {
      alert("올바른 MBTI를 입력해주세요");
      return;
    }

    addFriends(friends);
    setFriends(null);
    setVisibleInput(false);
  };

  return (
    <div>
      <div className="flex gap-2 h-10">
        <input
          className={
            "border border-gray-300 p-2 rounded-md focus:outline-none focus:border-primary"
          }
          type="text"
          placeholder={"이름"}
          onChange={(e) => {
            setFriends({ ...friends, name: e.target.value });
          }}
          value={friends?.name}
        />
        <input
          type="text"
          list="mbti-options"
          placeholder="MBTI 선택"
          className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-primary"
          onChange={(e) => {
            setFriends({ ...friends, mbti: e.target.value.toUpperCase() });
          }}
          value={friends?.mbti}
          maxLength={4}
        />
        <datalist id="mbti-options">
          {Object.keys(MBTI).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </datalist>
      </div>

      <div className="flex gap-2 justify-start mt-1">
        <Button
          className={"bg-primary text-white"}
          onClick={onHandleAddFriends}
        >
          추가하기
        </Button>

        <Button
          className={"bg-gray-300 text-white"}
          onClick={() => {
            setFriends(null);
            setVisibleInput(false);
          }}
        >
          취소
        </Button>
      </div>
    </div>
  );
};

export default AddFriends;
