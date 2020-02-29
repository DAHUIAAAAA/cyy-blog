const types = {
    START_POST_LOGIN: 'START_POST_LOGIN',
    SUCCESS_POST_LOGIN: 'SUCCESS_POST_LOGIN',
    FAILURE_POST_LOGIN: 'FAILURE_POST_LOGIN',
    LOGIN_OUT: 'LOGIN_OUT'
}

const initState = {
    status: '',
    data: {}
}

export {
    types,
    initState
}