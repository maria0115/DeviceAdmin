import axios from 'axios';
function GetLanguage(app) {
    return axios({
        method: 'get',
        url: `/api/languages?key=${app}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
function Logout(data) {
    return axios({
        method: 'DELETE',
        url: `/api/login?type=logout`,
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
function Login(data) {
    return axios({
        method: 'post',
        url: `/api/login?type=login`,
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}

function MyInfo(){
    return axios({
        method: 'get',
        url: `/api/myinfo`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export {
    Logout,Login,MyInfo,GetLanguage
}