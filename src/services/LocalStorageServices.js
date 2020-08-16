import Storage from "react-native-storage";
import AsyncStorage from "@react-native-community/async-storage";

const storage = new Storage({
  // maximum capacity, default 1000
  size: 1000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage, // for web: window.localStorage

  // expire time, default: 30 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: 1000 * 3600 * 24 * 30,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  sync: {
    // we'll talk about the details later.
  },
});
// I suggest you have one (and only one) storage instance in global scope.

// for web
// window.storage = storage;

// for react native
global.storage = storage;

export const setAccountAndAccessToken = async (accessToken, account) => {
  try {
    await storage.save({
      key: "ACCOUNT",
      data: {
        account,
        accessToken,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const deleteAccountAndAccessToken = async () => {
  try {
    await storage.remove({
      key: "ACCOUNT",
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const getAccount = async () => {
  try {
    const account = await storage.load({
      key: "ACCOUNT",
    });
    return account.account;
  } catch (error) {
    return null;
  }
};

export const getAccessToken = async () => {
  try {
    const account = await storage.load({
      key: "ACCOUNT",
    });
    return account.accessToken;
  } catch (error) {
    return null;
  }
};

export const getHistorySearch = async (userID) => {
  try {
    const historySearch = await storage.load({
      key: "HISTORY-SEARCH",
    });
    let result = [];
    historySearch.map((i) => {
      if (i.userID === userID) {
        result = i.data;
      }
    });
    return result;
  } catch (error) {
    return [];
  }
};

export const setHistorySearch = async (userID, keyword) => {
  try {
    let historySearch = [];
    try {
      historySearch = await storage.load({
        key: "HISTORY-SEARCH",
      });
    } catch (error) {}

    if (historySearch.length === 0) {
      historySearch = [
        {
          userID: userID,
          data: [
            {
              id: 1,
              name: keyword,
            },
          ],
        },
      ];
    } else {
      const userIDs = historySearch.map((i) => i.userID);
      if (userIDs.includes(userID)) {
        historySearch.map((i) => {
          let isExisted = false;
          if (i.userID === userID) {
            i.data.map((j) => {
              if (j.name === keyword) {
                isExisted = true;
              }
            });
          }
          if (!isExisted) {
            const nextID = i.data.length + 1;
            i.data.push({
              id: nextID,
              name: keyword,
            });
          }
        });
      } else {
        historySearch.push({
          userID: userID,
          data: [
            {
              id: 1,
              name: keyword,
            },
          ],
        });
      }
    }
    await storage.save({
      key: "HISTORY-SEARCH",
      data: historySearch,
    });

    let result = [];
    historySearch.map((i) => {
      if (i.userID === userID) {
        result = i.data;
      }
    });
    return result;
  } catch (error) {
    return [];
  }
};

export const setDownloadedVideo = async (data) => {
  let downloaded = [];
  try {
    downloaded = await storage.load({
      key: "VIDEO",
    });
  } catch (error) {
    console.log(error);
  }

  let isExisted = false;
  for (let i = 0; i < downloaded.length; i++) {
    if (downloaded[i].lessonID === data.lessonID) {
      isExisted = true;
      break;
    }
  }

  if (!isExisted) {
    downloaded.push(data);
  }

  try {
    await storage.save({
      key: "VIDEO",
      data: downloaded,
    });
  } catch (error) {}
  return downloaded;
};

export const getAllDownloadedVideo = async () => {
  let downloaded = [];
  try {
    downloaded = await storage.load({
      key: "VIDEO",
    });
  } catch (error) {}
  return downloaded;
};
