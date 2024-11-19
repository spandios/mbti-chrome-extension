import {
  AlertTriangle,
  Brain,
  ChevronRight,
  HandHeart,
  Heart,
  Star,
} from "lucide-react";
import React from "react";
import { MBTI } from "../../constant/mbti";

const MbtiDetail = ({ mbti }) => {
  const mbtiData = MBTI[mbti];

  const dataKeys = ["factBomb", "tips", "loveStyle", "strengths", "weaknesses"];

  const data = {
    factBomb: {
      title: "팩트 폭격",
      icon: <Brain className="w-4 h-4 text-blue-500" />,
      items: mbtiData.factBomb,
      bgColor: "bg-blue-50",
    },
    tips: {
      title: "친해지는 팁!",
      icon: <HandHeart className="w-4 h-4 text-green-500" />,
      items: mbtiData.tips,
      bgColor: "bg-green-50",
    },
    loveStyle: {
      title: "사랑 스타일",
      icon: <Heart className="w-4 h-4 text-red-500" />,
      items: mbtiData.loveStyle,
      bgColor: "bg-red-50",
    },
    strengths: {
      title: "강점",
      icon: <Star className="w-4 h-4 text-yellow-500" />,
      items: mbtiData.strengths,
      bgColor: "bg-yellow-50",
    },
    weaknesses: {
      title: "약점",
      icon: <AlertTriangle className="w-4 h-4 text-orange-500" />,
      items: mbtiData.weaknesses,
      bgColor: "bg-orange-50",
    },
  };

  function keyToTitle(key) {
    const title = {
      hashtags: "핵심 특성",
      factBomb: "팩트 폭격",
      tips: "친해지는 팁!",
      loveStyle: "사랑 스타일",
      strengths: "강점",
      weaknesses: "약점",
    };
    return title[key];
  }

  const CategorySection = ({ icon, title, items, bgColor }) => (
    <div className={`p-4 rounded-lg ${bgColor} mb-4 shadow-sm`}>
      <div className="flex items-center gap-2 mb-3 font-semibold text-lg">
        {icon}
        <h3>{title}</h3>
      </div>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="flex items-center gap-2 text-gray-700 text-sm text-left"
          >
            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  if (!mbtiData) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white overflow-hidden rounded-lg shadow-md">
        <div className="p-2">
          <div className="grid md:grid-cols-2 gap-6">
            {dataKeys.map((key, idx) => (
              <CategorySection key={idx} {...data[key]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MbtiDetail;
