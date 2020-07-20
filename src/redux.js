import {
    AsyncStorage
} from "react-native";
import instance from "./services/AxiosServices";

export const accountAction = {
    login: (account) => async dispatch => {
        const email = account.email.toLowerCase();
        try {
            const {
                data
            } = await instance.post('user/login', {
                email,
                password: account.password
            });

            const accessToken = data.token;
            const accountToken = JSON.stringify(data.userInfo);

            await AsyncStorage.setItem('ACCESS_TOKEN', accessToken);
            await AsyncStorage.setItem('ACCOUNT_TOKEN', accountToken);

            return dispatch({
                type: "LOGIN_SUCCESS",
                payload: {
                    accessToken,
                    account: data.userInfo
                },
            });
        } catch (error) {
            let status = "Có lỗi xảy ra, vui lòng thử lại.";
            if (error.response) {
                status = error.response.data;
            }

            return dispatch({
                type: "LOGIN_FAILED",
                payload: {
                    status,
                },
            });
        }
    },
    logout: () => async dispatch => {
        await AsyncStorage.removeItem('ACCESS_TOKEN');
        await AsyncStorage.removeItem('ACCOUNT_TOKEN');

        return dispatch({
            type: "LOGOUT_SUCCESS"
        });
    }
}

let accessToken = null;
let account = null;
async function fetchToken() {
    accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
    const accountToken = await AsyncStorage.getItem(ACCOUNT_TOKEN);
    if (accountToken) {
        account = JSON.parse(accountToken);
    }
}
fetchToken();

const initialState = {
    accessToken,
    account
};

export default (state = initialState, action) => {
    if (action.type === 'LOGIN_SUCCESS') {
        state.accessToken = action.payload.accessToken;
        state.account = action.payload.account;
        return {
            ...state,
            accessToken: action.payload.accessToken,
            account: action.payload.account
        }
    } else if (action.type === 'LOGIN_FAILED') {
        return {
            status: action.payload.status
        }
    } else if (action.type === 'LOGOUT_SUCCESS') {
        state.accessToken = null;
        state.account = null;
        return {
            ...state,
            accessToken: null,
            account: null,
        }
    }
    return state;
};