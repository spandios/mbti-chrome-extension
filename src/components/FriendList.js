import React from 'react';

const FriendList = ({friends, onSelectFriends}) => {
    if(!friends){
        return <></>
    }
    return (
        <div>
            {friends.map((f,index)=>{
                return <div key={f.name + index} onClick={()=>{
                    onSelectFriends(f);
                }}>
                    <h1>{f.name}</h1>
                    <h2>{f.mbti}</h2>
                </div>
            })}
        </div>
    );
};

export default FriendList;