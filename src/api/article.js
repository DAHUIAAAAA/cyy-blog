import axios from 'axios'
import { baseUrl } from './config'

const getEachArticle = time => {
    return axios({
        url: `${baseUrl}/article/each/${time}`,
        method: 'get',
        headers: {
            'Authorization': localStorage.getItem('cyy_blog_token')
        }
    })
}

const getArticleList = (time, length, dataIsNull) => {
    if (dataIsNull) {
        return []
    }
    return axios({
        url: `${baseUrl}/article/list?time=${time}&length=${length}`,
        method: 'get'
    })
}

export {
    getEachArticle,
    getArticleList
}