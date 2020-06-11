import * as type from '../Courses.Constants/ActionTypes';

export const getCourses = (courses) => {
    return {
        type: type.GET_COURSES,
        courses
    }
}