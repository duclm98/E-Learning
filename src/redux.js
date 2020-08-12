import {
    AsyncStorage
} from "react-native";
import moment from "moment";
import instance from "./services/AxiosServices";
import * as method from "./methods";

let accessToken = null;
let account = null;
let historySearch = [];
async function fetchDataFromStorage() {
    accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");

    if (accessToken) {
        const accountToken = await AsyncStorage.getItem("ACCOUNT_TOKEN");
        if (accountToken) {
            account = JSON.parse(accountToken);
        }

        const historySearchToken = await AsyncStorage.getItem("HISTORY_SEARCH");
        if (historySearchToken) {
            const historySearchTemp = historySearchToken.split(",");
            historySearch = historySearchTemp.map((item, index) => {
                return {
                    id: index,
                    name: item,
                };
            });
        }
    }
}
fetchDataFromStorage();

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

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: {
                    accessToken,
                    account: data.userInfo,
                },
            });

            return {
                status: true,
            };
        } catch (error) {
            let msg = "Có lỗi xảy ra, vui lòng thử lại.";
            if (error.response) {
                msg = error.response.data.message;
            }

            return {
                status: false,
                msg,
            };
        }
    },
    logout: () => async (dispatch) => {
        await AsyncStorage.removeItem("ACCESS_TOKEN");
        await AsyncStorage.removeItem("ACCOUNT_TOKEN");

        return dispatch({
            type: "LOGOUT_SUCCESS",
        });
    },
    createAccount: (email, password, phone) => async (_) => {
        try {
            const {
                data
            } = await instance.post("user/register", {
                email: email.toLowerCase(),
                password,
                phone,
            });

            return {
                status: true,
                msg: data.message,
            };
        } catch (error) {
            let msg = "Có lỗi xảy ra, vui lòng thử lại.";
            if (error.response) {
                msg = error.response.data.message;
            }

            return {
                status: false,
                msg,
            };
        }
    },
    forgetPassword: (email) => async (_) => {
        try {
            const {
                data
            } = await instance.post("user/forget-pass/send-email", {
                email: email.toLowerCase(),
            });

            return {
                status: true,
                msg: data.message,
            };
        } catch (error) {
            let msg = "Có lỗi xảy ra, vui lòng thử lại.";
            if (error.response) {
                msg = error.response.data.message;
            }

            return {
                status: false,
                msg,
            };
        }
    },
};

export const categoryAcction = {
    getCategories: () => async (_) => {
        try {
            const {
                data
            } = await instance.get("category/all");

            return {
                status: true,
                data: data.payload,
            };
        } catch (error) {
            return {
                status: false,
            };
        }
    },
};

export const courseAcction = {
    getRecommendCourses: (limit, offset) => async (_) => {
        try {
            const account = await method.getAccountInfo();
            const courses = await instance.get(
                `user/recommend-course/${account.id}/${limit}/${offset}`
            );

            const data = await Promise.all(
                courses.data.payload.map(async (i) => {
                    try {
                        const instructor = await instance.get(
                            `instructor/detail/${i.instructorId}`
                        );
                        return {
                            ...i,
                            released: moment(i.updatedAt).format("DD/MM/YYYY"),
                            author: instructor.data.payload.name,
                        };
                    } catch (error) {}
                })
            );

            return {
                status: true,
                data,
            };
        } catch (error) {
            return {
                status: false,
            };
        }
    },
    getNewCourses: (limit, page) => async (dispatch) => {
        try {
            const courses = await instance.post("course/top-new", {
                limit: limit,
                page: page,
            });

            const data = await Promise.all(
                courses.data.payload.map(async (i) => {
                    try {
                        const instructor = await instance.get(
                            `instructor/detail/${i.instructorId}`
                        );
                        return {
                            ...i,
                            released: moment(i.updatedAt).format("DD/MM/YYYY"),
                            author: instructor.data.payload.name,
                        };
                    } catch (error) {}
                })
            );

            return {
                status: true,
                data,
            };
        } catch (error) {
            return {
                status: false,
            };
        }
    },
    getRateCourses: (limit, page) => async (dispatch) => {
        try {
            const courses = await instance.post("course/top-rate", {
                limit: limit,
                page: page,
            });

            const data = await Promise.all(
                courses.data.payload.map(async (i) => {
                    try {
                        const instructor = await instance.get(
                            `instructor/detail/${i.instructorId}`
                        );
                        return {
                            ...i,
                            released: moment(i.updatedAt).format("DD/MM/YYYY"),
                            author: instructor.data.payload.name,
                        };
                    } catch (error) {}
                })
            );

            return {
                status: true,
                data,
            };
        } catch (error) {
            return {
                status: false,
            };
        }
    },
    searchCourses: (keyword, limit, offset) => async (dispatch) => {
        try {
            const courses = await instance.post("course/search", {
                keyword: keyword,
                opt: {
                    sort: {
                        attribute: "updatedAt",
                        rule: "DESC",
                    },
                },
                limit: limit,
                offset: offset,
            });

            const data = courses.data.payload.rows.map((i) => {
                return {
                    ...i,
                    author: i.name,
                    released: moment(i.updatedAt).format("DD/MM/YYYY"),
                };
            });

            if (keyword !== "") {
                let historySearchTempToken = await AsyncStorage.getItem(
                    "HISTORY_SEARCH"
                );
                if (historySearchTempToken) {
                    const historySearchTemp = historySearchTempToken.split(",");
                    await AsyncStorage.setItem(
                        "HISTORY_SEARCH",
                        [...historySearchTemp, keyword].toString()
                    );
                } else {
                    await AsyncStorage.setItem("HISTORY_SEARCH", [keyword].toString());
                }

                dispatch({
                    type: "SAVE_HISTORY_SEARCH",
                    payload: {
                        keyword,
                    },
                });
            }

            return {
                status: true,
                data: data,
            };
        } catch (error) {
            return {
                status: false,
            };
        }
    },
    getFavorites: () => async (dispatch) => {
        try {
            instance.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${accessToken}`;
            const coursesList = await instance.get("user/get-favorite-courses");

            const data = await Promise.all(
                coursesList.data.payload.map(async (i) => {
                    try {
                        const course = await instance.get(
                            `course/get-course-info?id=${i.id}`
                        );
                        return {
                            id: course.data.payload.id,
                            imageUrl: i.courseImage,
                            title: i.courseTitle,
                            price: i.coursePrice,
                            released: moment(course.data.payload.updatedAt).format(
                                "DD/MM/YYYY"
                            ),
                            author: i.instructorName,
                            totalHours: course.data.payload.totalHours,
                        };
                    } catch (error) {
                        console.log(error);
                    }
                })
            );

            return dispatch({
                type: "GET_FAVORITES_SUCCESS",
                payload: {
                    favorites: data,
                },
            });
        } catch (error) {
            console.log(error);
        }
    },
    likeCourse: (courseID) => async (dispatch) => {
        try {
            instance.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${accessToken}`;
            const like = await instance.post("user/like-course", {
                courseId: courseID,
            });

            const course = await instance.get(
                `course/get-course-info?id=${courseID}`
            );

            const instructor = await instance.get(
                `instructor/detail/${course.data.payload.instructorId}`
            );

            const data = {
                id: course.data.payload.id,
                imageUrl: course.data.payload.imageUrl,
                title: course.data.payload.title,
                price: course.data.payload.price,
                released: moment(course.data.payload.updatedAt).format("DD/MM/YYYY"),
                author: instructor.data.payload.name,
                totalHours: course.data.payload.totalHours,
            };

            dispatch({
                type: "LIKE_COURSE_SUCCESS",
                payload: {
                    favorite: data,
                },
            });

            return {
                status: true,
            };
        } catch (error) {
            let msg = "Có lỗi xảy ra, vui lòng thử lại";
            if (error.response) {
                msg = error.response.data.message;
            }

            return {
                status: false,
                msg,
            };
        }
    },
    getMyCourses: () => async (dispatch) => {
        try {
            instance.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${accessToken}`;
            const myCourses = await instance.get("user/get-process-courses");

            const data = await Promise.all(
                myCourses.data.payload.map(async (i) => {
                    try {
                        const course = await instance.get(
                            `course/get-course-info?id=${i.id}`
                        );
                        return {
                            id: course.data.payload.id,
                            imageUrl: i.courseImage,
                            title: i.courseTitle,
                            price: i.coursePrice,
                            released: moment(course.data.payload.updatedAt).format(
                                "DD/MM/YYYY"
                            ),
                            author: i.instructorName,
                            totalHours: course.data.payload.totalHours,
                        };
                    } catch (error) {
                        console.log(error);
                    }
                })
            );

            dispatch({
                type: "GET_MY_COURSES_SUCCESS",
                payload: {
                    myCourses: data,
                },
            });

            return {
                status: true,
                data: data,
            };
        } catch (error) {
            console.log(error);
        }
    },
    freelyRegisterCourse: (courseID) => async (dispatch) => {
        try {
            instance.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${accessToken}`;
            const register = await instance.post("payment/get-free-courses", {
                courseId: courseID
            });

            const course = await instance.get(
                `course/get-course-info?id=${courseID}`
            );

            const instructor = await instance.get(
                `instructor/detail/${course.data.payload.instructorId}`
            );

            const data = {
                id: course.data.payload.id,
                imageUrl: course.data.payload.imageUrl,
                title: course.data.payload.title,
                price: course.data.payload.price,
                released: moment(course.data.payload.updatedAt).format("DD/MM/YYYY"),
                author: instructor.data.payload.name,
                totalHours: course.data.payload.totalHours,
            };

            dispatch({
                type: "FREELY_REGISTER_COURSE_SUCCESS",
                payload: {
                    myCourses: data,
                },
            });

            return {
                status: true,
            };
        } catch (error) {
            let msg = "Có lỗi xảy ra, vui lòng thử lại";
            if (error.response) {
                msg = error.response.data.messsage;
            }

            return {
                status: false,
                msg,
            };
        }
    },
};

const initialState = {
    accessToken,
    account,
    historySearch,
    favorites: {
        data: [],
        isChange: true,
    },
    myCourses: {
        data: [],
        isChange: true,
    },
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
    } else if (action.type === "SEARCH_SUCCESS") {
        return {
            ...state,
            searchCourses: action.payload.courses,
        };
    } else if (action.type === "SEARCH_FAILED") {
        return {
            ...state,
            searchCourses: [],
        };
    } else if (action.type === "SAVE_HISTORY_SEARCH") {
        const nextID = state.historySearch.length;
        return {
            ...state,
            historySearch: [
                ...state.historySearch,
                {
                    id: nextID,
                    name: action.payload.keyword,
                },
            ],
        };
    } else if (action.type === "GET_FAVORITES_SUCCESS") {
        return {
            ...state,
            favorites: {
                data: action.payload.favorites,
                isChange: false,
            },
        };
    } else if (action.type === "LIKE_COURSE_SUCCESS") {
        return {
            ...state,
            favorites: {
                data: [],
                isChange: true,
            },
        };
    } else if (action.type === "GET_MY_COURSES_SUCCESS") {
        return {
            ...state,
            myCourses: {
                data: action.payload.myCourses,
                isChange: false,
            },
        };
    } else if (action.type === "FREELY_REGISTER_COURSE_SUCCESS") {
        return {
            ...state,
            myCourses: {
                data: [...state.myCourses.data, action.payload.myCourses]
            },
        };
    }
    return state;
};