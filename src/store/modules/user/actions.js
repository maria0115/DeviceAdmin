import {
    lostDeviceList,SetLost,InitOrg,Org,DelLost,GetAdmin
} from '../../../api/user';

export default {
    GetAdmin({rootState,commit},data){
        data.isAdmin = rootState.store.myinfo.isAdmin;
        return GetAdmin(data)
        .then(res => {
            commit("List", {value:res.data,data});
            commit("setOption",data);
            return res.status == 200 ? res.data : false;
        })

    },
    GetAdminDownload({rootState,commit},data){
        data.isAdmin = rootState.store.myinfo.isAdmin;

        return GetAdmin(data)
        .then(res => {
            commit("setOption",data);
            return res.status == 200 ? res.data : false;
        })

    },
    lostDeviceList({rootState, commit }, data) {
        data.isAdmin = rootState.store.myinfo.isAdmin;
        return lostDeviceList(data)
            .then(res => {
                commit("List", {value:res.data,data});
                return res.status == 200 ? res.data : false;
            })
    },
    SetLost({state},data){
        return SetLost(data)
        .then(res => {
            return res.status == 200 ? res.data : false;
        })
    },
    DelLost({state},data){
        return DelLost(data)
        .then(res => {
            return res.status == 200 ? res.data : false;
        })
    },
    Org({state}, data) {
        return Org(data)
            .then((res) => {
                return res.data;
            })
    },
    InitOrg({ commit, }, data) {
        return InitOrg(data)
            .then((res) => {
                commit("InitOrg", res.data);
                return res.data;
            })
    },
}