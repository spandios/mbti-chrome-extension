import {useEffect, useState} from 'react';
import './App.css';
import {addFriends, getFriends, saveMyInfo} from "./API";
import Welcome from "./components/welcome";
import {getChromeUserInfo, getSyncUserInfo} from "./ChromeAPI";
import AddFriends from "./components/AddFreinds";
import FriendList from "./components/FriendList";
import {KEMI_VALUE} from "./kemi";
import {PersonalityProfile} from "./components/KemiView";

function App() {
    const [userInfo, setUserInfo] = useState(null);
    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);

    async function findMyInfo() {

        const syncData = await getSyncUserInfo()

        if (syncData) {
            setUserInfo(syncData);
        } else {
            const chromeUserInfo = await getChromeUserInfo();
            console.log("CHROME USER INFO", chromeUserInfo);
            setUserInfo(chromeUserInfo);
        }
    }


    useEffect(() => {
        findMyInfo().catch(err=>{
            console.error(err);
        });
    }, []);

    useEffect(() => {
        if(userInfo && userInfo?.mbti) {
            console.log("USER INFO", userInfo);
            getFriends(userInfo.user_id).then((data) => {
                setFriends(data)
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [userInfo]);


    if(!userInfo?.mbti){
        return <Welcome onSaveMyMBTI={(mbti) => {
            console.log("SAVE MY MBTI", userInfo, mbti);
            saveMyInfo(userInfo, mbti).then((data) => {
                console.log("SAVE MY INFO", data);
                setUserInfo(data);
            }).catch((error) => {
                console.error(error);
            });
        }}></Welcome>
    }

    if(selectedFriend){
        return <div>
            <h1>{selectedFriend.name}</h1>
            <h2>{selectedFriend.mbti}</h2>
           <h3>KEMI</h3>
            <PersonalityProfile data={KEMI_VALUE[selectedFriend.mbti][userInfo.mbti]}></PersonalityProfile>
            <button onClick={()=>{
                setSelectedFriend(null);
            }}>Back</button>
        </div>
    }


    return <div className="App ">
        Hello
        {(userInfo && userInfo?.mbti) && <div>
            <h1>{userInfo.email}</h1>
            <h2>{userInfo.mbti}</h2>
            <AddFriends onAddFriends={(f=>{
                addFriends(userInfo.user_id, f).then((data)=>{
                    console.log("ADD FRIENDS", data);
                }).catch((error)=>{
                    console.error(error);
                })
            })}/>
            <FriendList friends={friends} onSelectFriends={(friends)=>{
                setSelectedFriend(friends);
            }}/>
        </div>
        }
    </div>;
}

export default App;
