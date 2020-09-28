import Axios from "axios";
import BASEURL from '../config/urlConstants'

function post(bookData, url) {
    return Axios({
        method: 'post',
        url: `${BASEURL.appUrl}${url}`,
        data: bookData,
        headers: {
            'token': url.includes("admin")?localStorage.getItem('adminToken') : localStorage.getItem('userToken')
        }
    })
}

function get(url) {
    return Axios({
        method: 'get',
        url: `${BASEURL.appUrl}${url}`,
        headers: {
            'token': url.includes("admin")?localStorage.getItem('adminToken') : localStorage.getItem('userToken')
        }
    })
}

function update(url) {
    return Axios({
        method: 'put', //you can set what request you want to be
        url: `${BASEURL.appUrl}${url}`,
        headers: {
            'token': url.includes("admin")?localStorage.getItem('adminToken') : localStorage.getItem('userToken')
        }
    })
}

function deleteData(url) {
    return Axios({
        method: 'delete',
        url: `${BASEURL.appUrl}${url}`,
        headers: {
            'token': url.includes("admin")?localStorage.getItem('adminToken') : localStorage.getItem('userToken')
        }
    })
}

export {post, get, update, deleteData}
