import React, {useState} from 'react';

const AddFriends = ({onAddFriends}) => {

    const [friends, setFriends] = useState();

    return (
            <div className="flex">
                <h1 className="text-2xl">Add Friends</h1>
                <input className={"border-2 border-gray-300 p-2"} type="text" placeholder={"name"} onChange={(e) => {
                    setFriends({...friends, name: e.target.value});
                }}/>
                <input className={"border-2 border-gray-300 p-2"} type="text" placeholder={"mbti"} onChange={(e) => {
                    setFriends({...friends, mbti: e.target.value});
                }}
                />
                <button className={"bg-blue-500 text-white p-2"} onClick={()=>{
                    onAddFriends(friends);
                }}>Add</button>
            </div>
    );
};

export default AddFriends;