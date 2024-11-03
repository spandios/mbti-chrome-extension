import React from 'react';

export const PersonalityProfile = ({ data }) => {
    if (!data) return null;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">성격 유형 분석</h2>

            {/* 전체 점수와 요약 */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold">전체 점수: {data.total}</h3>
                <p className="text-gray-600">{data.summary}</p>
            </div>

            {/* 인지 기능 */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold">인지 기능 - {data.cognitive.score}점</h3>
                <ul className="list-disc pl-5 mt-2">
                    <li>주도 기능: {data.cognitive.detail.dominant}</li>
                    <li>보조 기능: {data.cognitive.detail.auxiliary}</li>
                    <li>호환성: {data.cognitive.detail.compatibility}</li>
                </ul>
            </div>

            {/* 의사결정 */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold">의사결정 - {data.decisionMaking.score}점</h3>
                <ul className="list-disc pl-5 mt-2">
                    <li>구조 선호도: {data.decisionMaking.detail.structurePreference}</li>
                    <li>시간 관리: {data.decisionMaking.detail.timeManagement}</li>
                    <li>적응성: {data.decisionMaking.detail.adaptability}</li>
                </ul>
            </div>

            {/* 가치관 */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold">가치관 - {data.values.score}점</h3>
                <ul className="list-disc pl-5 mt-2">
                    <li>세계관: {data.values.detail.worldview}</li>
                    <li>우선순위: {data.values.detail.priorityAlignment}</li>
                    <li>목표 지향: {data.values.detail.goalOrientation}</li>
                </ul>
            </div>

            {/* 의사소통 */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold">의사소통 - {data.communication.score}점</h3>
                <ul className="list-disc pl-5 mt-2">
                    <li>표현 스타일: {data.communication.detail.expressionStyle}</li>
                    <li>정보 처리: {data.communication.detail.informationProcessing}</li>
                    <li>갈등 해결: {data.communication.detail.conflictResolution}</li>
                </ul>
            </div>
        </div>
    );
};