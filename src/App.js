import { useEffect } from 'react';
import './App.css';
/* global chrome */

function App() {
  function getUserInfo() {
    return new Promise((resolve, reject) => {
      chrome.identity.getProfileUserInfo({ accountStatus: 'ANY' }, (userInfo) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError.message);
        } else {
          resolve(userInfo);
        }
      });
    });
  }

  useEffect(() => {
    getUserInfo()
      .then((userInfo) => {
        console.log(userInfo);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return <div className="App w-1/2 h-1/2">Hello</div>;
}

export default App;
