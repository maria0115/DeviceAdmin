import axios from 'axios';
// 
function GetAdmin(data) {
    var query = Object.entries(data).map(e => e.join('=')).join('&');
    return axios({
        method: 'get',
        url: `/api/admin?${query}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
function DelLost(data) {
    return axios({
        method: 'delete',
        url: `/api/admin?type=${data.type}&deviceId=${data.deviceId}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
function SetLost(data) {
    return axios({
        method: 'get',
        url: `/api/admin?type=${data.type}&deviceId=${data.deviceId}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
function lostDeviceList(data) {
    return axios({
        method: 'get',
        url: `/api/admin?type=${data.type}&state=${data.state}&size=${data.size}&page=${data.page}&filter=${data.filter}&keyword=${data.keyword}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 조직도
function Org(data) {
    return axios({
        method: 'get',
        url: `/api/mail?type=orgSearch&companycode=${data.companycode}&departmentcode=${data.mycode}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 초기 조직도
function InitOrg(data) {
    return axios({
        method: 'get',
        url: `/api/mail?type=org`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export {
    lostDeviceList,
    SetLost,
    DelLost,
    Org,
    InitOrg,
    GetAdmin,
}