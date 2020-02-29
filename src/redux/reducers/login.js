import { types, initState } from '../actions/login'

export default (state = initState, action) => {
    switch (action.type) {
        case types.START_POST_LOGIN:
            return {
                ...state,
                status: 'pending'
            }
        case types.SUCCESS_POST_LOGIN:
            return {
                ...state,
                status: 'success',
                data: action.data
            }
        case types.FAILURE_POST_LOGIN:
            return {
                ...state,
                status: 'failure'
            }
        case types.LOGIN_OUT:
            return {
                data: {},
                status: ''
            }
        default:
            return state
    }
}

const startPostLogin = () => ({
    type: types.START_POST_LOGIN
})

const successPostLogin = msg => ({
    type: types.SUCCESS_POST_LOGIN,
    data: msg
})

const failurePostLogin = () => ({
    type: types.FAILURE_POST_LOGIN
})

const successLoginOut = ()=>({
    type: types.LOGIN_OUT
})

export {
    startPostLogin,
    successPostLogin,
    failurePostLogin,
    successLoginOut
}