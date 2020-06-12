import * as variable from '../../globals/variables';

export const login = (username, password) => {
    let account;
    let isExisted = false;
    for (let i = 0; i < variable.accounts.length; i++) {
        if (username.toLowerCase() === variable.accounts[i].username) {
            account = variable.accounts[i];
            isExisted = true;
            break;
        }
    }
    if (!isExisted) {
        return {
            status: 401,
            errStr: 'Username is not existed'
        };
    }
    if (password !== account.password) {
        return {
            status: 401,
            errStr: 'Username or password are not match'
        };
    }
    delete account.password;
    return {
        status: 200,
        account
    }
}