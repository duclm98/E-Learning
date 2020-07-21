import {
    AsyncStorage
} from "react-native";
import moment from "moment";
import instance from "./services/AxiosServices";

export const accountAction = {
    login: (account) => async (dispatch) => {
        const email = account.email.toLowerCase();
        try {
            const {
                data
            } = await instance.post("user/login", {
                email,
                password: account.password,
            });

            const accessToken = data.token;
            const accountToken = JSON.stringify(data.userInfo);

            await AsyncStorage.setItem("ACCESS_TOKEN", accessToken);
            await AsyncStorage.setItem("ACCOUNT_TOKEN", accountToken);

            return dispatch({
                type: "LOGIN_SUCCESS",
                payload: {
                    accessToken,
                    account: data.userInfo,
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
    logout: () => async (dispatch) => {
        await AsyncStorage.removeItem("ACCESS_TOKEN");
        await AsyncStorage.removeItem("ACCOUNT_TOKEN");

        return dispatch({
            type: "LOGOUT_SUCCESS",
        });
    },
};

export const categoryAcction = {
    getCategories: () => async (dispatch) => {
        try {
            const {
                data
            } = await instance.get("category/all");
            return dispatch({
                type: "GET_CATEGORIES",
                payload: {
                    categories: data.payload,
                },
            });
        } catch (error) {}
    },
};

export const courseAcction = {
    getCourses: (limit) => async (dispatch) => {
        try {
            const courses = await instance.post("course/top-new", {
                limit: limit,
                page: 1,
            });

            const data = await Promise.all(courses.data.payload.map(async (i) => {
                try {
                    const instructor = await instance.get(`instructor/detail/${i.instructorId}`);
                    return {
                        ...i,
                        released: moment(i.updatedAt).format("DD/MM/YYYY"),
                        author: instructor.data.payload.name
                    }
                } catch (error) {
                    
                }
            }));

            return dispatch({
                type: "GET_COURSES",
                payload: {
                    courses: data,
                },
            });
        } catch (error) {}
    },
};

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
    account,
    categories: [],
    changeCategories: true,
    courses: [],
    changeCourses: true,
};

export default (state = initialState, action) => {
    if (action.type === "LOGIN_SUCCESS") {
        state.accessToken = action.payload.accessToken;
        state.account = action.payload.account;
        return {
            ...state,
            accessToken: action.payload.accessToken,
            account: action.payload.account,
        };
    } else if (action.type === "LOGIN_FAILED") {
        return {
            status: action.payload.status,
        };
    } else if (action.type === "LOGOUT_SUCCESS") {
        state.accessToken = null;
        state.account = null;
        return {
            ...state,
            accessToken: null,
            account: null,
        };
    } else if (action.type === "GET_CATEGORIES") {
        state.categories = action.payload.categories;
        state.changeCategories = false;
        return {
            ...state,
        };
    } else if (action.type === "GET_COURSES") {
        state.courses = action.payload.courses;
        state.changeCourses = false;
        return {
            ...state,
        };
    }
    return state;
};