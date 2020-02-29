import axios from 'axios'
import { baseUrl } from './config'

const getComment = (aid, time)  => {
    return axios({
        url: `${baseUrl}/comment/list?aid=${aid}&time=${time}`,
        method: 'get'
    })

}

const uploadComment = (a_id, u_id, message) => {

    return axios({
        url: `${baseUrl}/comment/list/upload`,
        method: 'post',
        data: {
            a_id,
            u_id,
            message
        },
        headers: {
            'Authorization': localStorage.getItem('cyy_blog_token')
        }
    })

}

const uploadReply = (a_id, c_id, u_id, message) => {
    return axios({
        url: `${baseUrl}/reply/list/upload`,
        method: 'post',
        data: {
            a_id,
            c_id,
            u_id,
            message
        },
        headers: {
            'Authorization': localStorage.getItem('cyy_blog_token')
        }
    })

}

export { getComment, uploadComment, uploadReply }