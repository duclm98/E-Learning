import {
    AsyncStorage
} from "react-native";
import moment from "moment";
import instance from "./services/AxiosServices";
import * as method from './methods';

export const accountAction = {
    login: (account) => async dispatch => {
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

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: {
                    accessToken,
                    account: data.userInfo,
                },
            });

            return {
                status: true
            }
        } catch (error) {
            let msg = "Có lỗi xảy ra, vui lòng thử lại.";
            if (error.response) {
                msg = error.response.data.message;
            }

            return {
                status: false,
                msg
            }
        }
    },
    logout: () => async (dispatch) => {
        await AsyncStorage.removeItem("ACCESS_TOKEN");
        await AsyncStorage.removeItem("ACCOUNT_TOKEN");

        return dispatch({
            type: "LOGOUT_SUCCESS",
        });
    },
    createAccount: (email, password, phone) => async _ => {
        try {
            const {
                data
            } = await instance.post("user/register", {
                email: email.toLowerCase(),
                password,
                phone
            });

            return {
                status: true,
                msg: data.message
            }
        } catch (error) {
            let msg = "Có lỗi xảy ra, vui lòng thử lại.";
            if (error.response) {
                msg = error.response.data.message;
            }

            return {
                status: false,
                msg
            }
        }
    },
    forgetPassword: (email) => async _ => {
        try {
            const {
                data
            } = await instance.post("user/forget-pass/send-email", {
                email: email.toLowerCase()
            });

            return {
                status: true,
                msg: data.message
            }
        } catch (error) {
            let msg = "Có lỗi xảy ra, vui lòng thử lại.";
            if (error.response) {
                msg = error.response.data.message;
            }

            return {
                status: false,
                msg
            }
        }
    }
};

export const categoryAcction = {
    getCategories: () => async _ => {
        try {
            const {
                data
            } = await instance.get("category/all");

            return {
                status: true,
                data: data.payload
            }
        } catch (error) {
            return {
                status: false
            }
        }
    },
};

export const courseAcction = {
    getRecommendCourses: (limit, offset) => async _ => {
        try {
            const account = await method.getAccountInfo();
            const courses = await instance.get(`user/recommend-course/${account.id}/${limit}/${offset}`);

            const data = await Promise.all(courses.data.payload.map(async (i) => {
                try {
                    const instructor = await instance.get(`instructor/detail/${i.instructorId}`);
                    return {
                        ...i,
                        released: moment(i.updatedAt).format("DD/MM/YYYY"),
                        author: instructor.data.payload.name
                    }
                } catch (error) {}
            }));

            return {
                status: true,
                data
            }
        } catch (error) {
            return {
                status: false
            }
        }
    },
    getNewCourses: (limit, page) => async (dispatch) => {
        try {
            const courses = await instance.post("course/top-new", {
                limit: limit,
                page: page,
            });

            const data = await Promise.all(courses.data.payload.map(async (i) => {
                try {
                    const instructor = await instance.get(`instructor/detail/${i.instructorId}`);
                    return {
                        ...i,
                        released: moment(i.updatedAt).format("DD/MM/YYYY"),
                        author: instructor.data.payload.name
                    }
                } catch (error) {}
            }));

            return {
                status: true,
                data
            }
        } catch (error) {
            return {
                status: false
            }
        }
    },
    getRateCourses: (limit, page) => async (dispatch) => {
        try {
            const courses = await instance.post("course/top-rate", {
                limit: limit,
                page: page,
            });

            const data = await Promise.all(courses.data.payload.map(async (i) => {
                try {
                    const instructor = await instance.get(`instructor/detail/${i.instructorId}`);
                    return {
                        ...i,
                        released: moment(i.updatedAt).format("DD/MM/YYYY"),
                        author: instructor.data.payload.name
                    }
                } catch (error) {}
            }));

            return {
                status: true,
                data
            }
        } catch (error) {
            return {
                status: false
            }
        }
    },
};

let accessToken = null;
let account = null;
async function fetchToken() {
    accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
    const accountToken = await AsyncStorage.getItem('ACCOUNT_TOKEN');
    if (accountToken) {
        account = JSON.parse(accountToken);
    }
}
fetchToken();

const initialState = {
    accessToken,
    account,
};

export default (state = initialState, action) => {
    if (action.type === "LOGIN_SUCCESS") {
        return {
            ...state,
            accessToken: action.payload.accessToken,
            account: action.payload.account,
        };
    } else if (action.type === "LOGOUT_SUCCESS") {
        return {
            ...state,
            accessToken: null,
            account: null,
        };
    }
    return state;
};