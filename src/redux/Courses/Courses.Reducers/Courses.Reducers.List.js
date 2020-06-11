const INITIAL_STATE = [{
    id: 1,
    title: 'React native',
    author: 'Hai Pham',
    level: 'Advance',
    released: 'May 6, 2020',
    duration: '30 hours'
}, {
    id: 2,
    title: 'NodeJS',
    author: 'Huy Nguyen',
    level: 'Advance',
    released: 'May 10, 2020',
    duration: '50 hours'
}, {
    id: 3,
    title: 'CICD',
    author: 'Huy Nguyen',
    level: 'Advance',
    released: 'May 10, 2020',
    duration: '60 hours'
}, {
    id: 4,
    title: 'React native',
    author: 'Hai Pham',
    level: 'Advance',
    released: 'May 6, 2020',
    duration: '30 hours'
}, {
    id: 5,
    title: 'NodeJS',
    author: 'Huy Nguyen',
    level: 'Advance',
    released: 'May 10, 2020',
    duration: '50 hours'
}, {
    id: 6,
    title: 'CICD',
    author: 'Huy Nguyen',
    level: 'Advance',
    released: 'May 10, 2020',
    duration: '60 hours'
}];

export default reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_COURSES':
            return state;
        default:
            return state
    }
};