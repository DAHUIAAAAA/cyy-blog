import axios from 'axios'
import { baseUrl } from './config'
import {
    startPostLogin,
    successPostLogin,
    failurePostLogin,
    successLoginOut
} from '../redux/reducers/login'

const login = user => dispatch => {

    dispatch(startPostLogin())

    return axios({
        url: `${baseUrl}/login`,
        data: user,
        method: 'post'
    })
        .then(res => {
            const msg = res.data
            console.log(res)
            dispatch(successPostLogin(msg))
            return 'success'
        })
        .catch(err => {
            console.log(err.response)
            dispatch(failurePostLogin())
            return 'failure'
        })

}

const loginOut = () => dispatch => {
    dispatch(successLoginOut())
}

const checkToken = token => {
    return axios({
        url: `${baseUrl}/check`,
        method: 'get',
        headers: {
            'Authorization': token
        }
    })
}

export {
    login,
    loginOut,
    checkToken
}