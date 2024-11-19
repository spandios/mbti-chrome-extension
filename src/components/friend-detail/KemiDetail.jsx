import React from "react";
import { KEMI_VALUE } from "../../constant/kemi";
import { useAppStore } from "../../store/app.store";

export const KemiDetail = () => {
  const { userInfo, selectedFriend } = useAppStore();
  if (!userInfo || !selectedFriend) return null;

  const keys = ["cognitive", "decisionMaking", "values", "communication"];

  const data = KEMI_VALUE[userInfo.mbti][selectedFriend.mbti];

  const { total, summary } = data;

  const keyName = {
    cognitive: "사고방식",
    decisionMaking: "의사결정",
    values: "가치관",
    communication: "의사소통",
  };

  const keyIcon = {
    cognitive: "🧠",
    decisionMaking: "🤔",
    values: "🎯",
    communication: "🗣️",
  };

  function renderAspect(key) {
    return (
      <div
        key={key}
        className="border rounded-lg p-3 hover:scale-105 transition-all duration-300"
      >
        <div className="mb-2">
          <span className="gap-1 flex items-center mb-1">
            <span className="text-2xl">{keyIcon[key]}</span>
            <h3 className="text-lg font-semibold mt-1">{keyName[key]}</h3>
          </span>
          <p className="text-gray-700 text-left">{data[key].summary}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-2">
        <h2 className="mt-8 text-lg font-semibold">
          우리의 케미 점수는 <span className={"text-primary"}>{total}</span>
          이에요!
        </h2>
        <p className="text-lg">{summary}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        {keys.map((key) => renderAspect(key))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-800 mb-2 text-base">
          점수 가이드
        </h3>
        <div className="space-y-1 text-sm text-blue-700 mb-2">
          <p>4.5 ~ 5.0: 최상의 궁합</p>
          <p>4.0 ~ 4.4: 좋은 궁합</p>
          <p>3.5 ~ 3.9: 보통의 궁합</p>
          <p>3.0 ~ 3.4: 노력이 필요한 궁합</p>
          <p>2.0 ~ 2.9: 도전적인 궁합</p>
        </div>
      </div>
    </div>
  );
};
