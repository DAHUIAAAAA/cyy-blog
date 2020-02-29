import axios from 'axios'
import { baseUrl } from './config'

const getUser = msg => {

    return axios({
        url: `${baseUrl}/getUser?type=${msg.type}&msg=${msg.msg}`,
        method: 'get'
    })

}

const register = user => {

    return axios({
        url: `${baseUrl}/register`,
        data: user,
        method: 'post'
    })

}

export { getUser, register }