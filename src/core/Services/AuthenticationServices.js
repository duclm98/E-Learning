export const login = (username, password) => {
    if (username.toLowerCase() !== 'admin') {
        return {
            status: 401,
            errStr: 'Username is not existed'
        };
    }
    if (password !== '12345') {
        return {
            status: 401,
            errStr: 'Username or password are not match'
        };
    }
    return {
        status: 200
    }
}