export async function getSyncUserInfo(){
    return getStorageData("user")
}

export function getChromeUserInfo() {
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

export async function getStorageData(key) {
    if(!chrome?.storage?.sync) {
        console.error('chrome.storage.sync API를 사용할 수 없습니다.');
        return null;
    }

    return new Promise((resolve) => {
        chrome?.storage?.sync?.get(key, (result) => {
            const error = chrome.runtime.lastError;
            if (error) {
                console.error('Storage 데이터 가져오기 실패:', error);
                resolve(null);
            } else {
                resolve(result[key] || null);
            }
        });
    });
}


export async function setStorageData(key, value) {
    if(!chrome?.storage?.sync) {
        console.error('chrome.storage.sync API를 사용할 수 없습니다.');
        return false;
    }
    return new Promise((resolve) => {
        chrome?.storage?.sync?.set({[key]: value}, () => {
            const error = chrome.runtime.lastError;
            if (error) {
                console.error('Storage 데이터 저장 실패:', error);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

export async function removeStorageData(key) {
    if(!chrome?.storage?.sync) {
        console.error('chrome.storage.sync API를 사용할 수 없습니다.');
        return false;
    }
    return new Promise((resolve) => {
        chrome.storage.sync.remove(key, () => {
            const error = chrome.runtime.lastError;
            if (error) {
                console.error('Storage 데이터 삭제 실패:', error);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}