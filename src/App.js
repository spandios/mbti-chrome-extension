import {useEffect, useState} from 'react';
import './App.css';
import {findMyInfo, saveMyInfo} from "./API";
import Welcome from "./components/welcome";

/* global chrome */

function App() {
    const [userInfo, setUserInfo] = useState(null);

    function getUserInfo() {
        return new Promise((resolve, reject) => {
            chrome?.identity?.getProfileUserInfo(
                {accountStatus: 'ANY'},
                (userInfo) => {
                    if (chrome?.runtime?.lastError) {
                        reject(chrome?.runtime?.lastError.message);
                    } else {
                        resolve(userInfo);
                    }
                }
            );
        });
    }

    useEffect(() => {
        getUserInfo().then((userInfo) => {
            console.log("CHROME USER INFO", userInfo);
            findMyInfo(userInfo).then((data) => {
                setUserInfo(data);
            }).catch((error) => {
                console.error(error);
            });
        }).catch((error) => {
            console.error(error);
        })
    }, []);


    return <div className="App ">
        Hello
        {!userInfo && <Welcome onSaveMyMBTI={(mbti)=>{
            saveMyInfo(userInfo, mbti).then((data) => {
                setUserInfo(data);
            }).catch((error) => {
                console.error(error);
            });
        }}></Welcome>}
        {userInfo && <div>
            <h1>{userInfo[0]}</h1>
            <h2>{userInfo[0].mbti}</h2></div>})

    </div>;
}

export default App;
