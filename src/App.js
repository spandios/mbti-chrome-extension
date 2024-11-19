import { useEffect } from "react";
import { getFriends, saveMyInfo } from "./API";
import "./App.css";
import { getChromeUserInfo } from "./ChromeAPI";

import { getSyncUserInfo } from "./ChromeAPI";
import FriendDetail from "./components/FriendDetail";
import FriendList from "./components/FriendList";
import Header from "./components/Header";
import Welcome from "./components/welcome";
import { useAppStore } from "./store/app.store";

const MENUS = ["HOME", "KEMI_DETAIL", "ADD_FRIENDS"];

function App() {
  const { userInfo, setUserInfo, setFriends, addFriends, currentMenu } =
    useAppStore();

  console.log("CURRENT MENU", currentMenu);
  console.log("USER_INFO", userInfo);

  async function findMyInfo() {
    const syncData = await getSyncUserInfo();
    if (syncData) {
      console.log("SYNC DATA", syncData);
      setUserInfo(syncData);
    } else {
      const chromeUserInfo = await getChromeUserInfo();
      console.log("CHROME USER INFO", chromeUserInfo);
      setUserInfo(chromeUserInfo);
    }
  }

  useEffect(() => {
    findMyInfo().catch((err) => {
      console.error(err);
    });
  }, []);

  useEffect(() => {
    if (userInfo && userInfo?.mbti) {
      getFriends(userInfo.user_id)
        .then((data) => {
          console.log("GET FRIENDS", data);
          setFriends(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userInfo]);

  function renderContent() {
    if (!userInfo?.mbti) {
      return (
        <Welcome
          onSaveMyMBTI={(mbti) => {
            console.log("SAVE MY MBTI", userInfo, mbti);
            saveMyInfo(userInfo, mbti)
              .then((data) => {
                console.log("SAVE MY INFO", data);
                setUserInfo(data);
              })
              .catch((error) => {
                console.error(error);
              });
          }}
        />
      );
    }

    if (currentMenu === "HOME") {
      return <FriendList />;
    } else if (currentMenu === "KEMI_DETAIL") {
      return <FriendDetail />;
    } else if (currentMenu === "ADD_FRIENDS") {
      return (
        <AddFriends
          onAddFriends={(f) => {
            addFriends(f);
          }}
        />
      );
    }
  }

  return (
    <div className="App overflow-auto">
      <div className={"mb-4"}>
        <Header />
      </div>
      <div className={"p-4 pt-0"}>{renderContent()}</div>
    </div>
  );
}

export default App;
