import React from 'react';


const Welcome = ({onSaveMyMBTI}) => {
    const [mbti, setMbti] = React.useState('');
    return (
        <div>
            새로운 유저시군요 환영합니다!
            지금 내 MBTI를 추가해보세요!

            <input onChange={(e => setMbti(e.target.value))}/>
            <button onClick={()=>{
                onSaveMyMBTI(mbti);
            }}>MBTI 추가하기</button>
        </div>
    );
};

export default Welcome;