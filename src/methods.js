import {
    AsyncStorage
} from "react-native";

export const getAccountInfo = async () => {
    // await AsyncStorage.removeItem("ACCESS_TOKEN");
    // await AsyncStorage.removeItem("ACCOUNT_TOKEN");
    const accountToken = await AsyncStorage.getItem('ACCOUNT_TOKEN');
    if (accountToken) {
        return (JSON.parse(accountToken));
    }
}