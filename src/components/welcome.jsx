import React from "react";
import { saveMyInfo } from "../API";
import { MBTI } from "../constant/mbti";
import { useAppStore } from "../store/app.store";
import Button from "./ui/Button";
import Input from "./ui/Input";

const Welcome = () => {
  const { setUserInfo, userInfo } = useAppStore();
  const [mbti, setMbti] = React.useState("");
  const onHandleSave = () => {
    if (!mbti) {
      alert("MBTI를 선택해주세요.");
      return;
    }
    saveMyInfo(userInfo, mbti)
      .then((data) => {
        console.log("SAVE MY INFO", data);
        setUserInfo(data);
      })
      .catch((error) => {
        alert("오류가 발생했습니다. 다시 시도해주세요.");
        console.error(error);
      });
  };
  return (
    <div>
      <div className="text-lg font-semibold mb-4">
        환영합니다! 지금 내 MBTI를 추가해보세요!
      </div>
      <div>
        <Input
          type="text"
          list="mbti-options"
          placeholder="MBTI 선택"
          onChange={(e) => {
            setMbti(e.target.value.toUpperCase());
          }}
          value={mbti}
          maxLength={4}
        />
        <datalist id="mbti-options">
          {Object.keys(MBTI).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </datalist>
        <Button className=" bg-primary text-white ml-2" onClick={onHandleSave}>
          MBTI 추가하기
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
