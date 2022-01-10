import {
     Login, Logout,MyInfo,GetLanguage
} from '../api/index.js';
import { setRawCookie } from 'tiny-cookie';
import cookie from 'vue-cookies';
import config from '../config/config.json';
export default {
    GetLanguage({commit},app){
        return GetLanguage(app)
        .then(res=>{
            if(res.status == 200){
                commit("GetLanguage",{data:res.data,app});
                return res.data;
            }
            return false;
        })

    },
    MyInfo({commit}){
        return MyInfo()
        .then(res=>{
            if(res.status == 200){
                commit("MyInfo",res.data);
                return res.data;
            }
            return false;
        })
    },
    logout(s) {
        cookie.set("LtpaToken", "");
        cookie.set("language", "");

        if (!JSON.parse(localStorage.getItem("idSave"))) {
            localStorage.setItem(`${config.packageName}id`, "");
        }
        localStorage.setItem("autoLogin", false);
        localStorage.setItem(`${config.packageName}pass`, "");
        var info = JSON.parse(localStorage.getItem(`${config.packageName}deviceInformation`));
        Logout(info)
        .then((res) => {
            if(res.data.success){
                return;
            }
            return;
        })
        return;
    },
    setLogin() {
        const idSave = localStorage.getItem("idSave");
        const autoLogin = localStorage.getItem("autoLogin");
    },
    login({ state, commit }, credentials) {
        return Login(credentials)
            .then((res) => {
                if (res.data.success) {
                    var keys = Object.keys(res.data.cookies);
                    for (var i = 0; i < keys.length; i++) {
                        var key = keys[i];
                        setRawCookie(key, res.data.cookies[key]);
                    }
                    localStorage.setItem("idSave", credentials.idSave);
                    localStorage.setItem("autoLogin", credentials.autoLogin);

                    if (credentials.autoLogin) {
                        localStorage.setItem(`${config.packageName}id`, credentials.Username);
                        localStorage.setItem(`${config.packageName}pass`, credentials.Password);
                    }
                    else {
                        localStorage.setItem(`${config.packageName}id`, "");
                        localStorage.setItem(`${config.packageName}pass`, "");
                        if (credentials.idSave) {
                            localStorage.setItem(`${config.packageName}id`, credentials.Username);
                        }
                    }
                }
                return res.data;
            })
    },

}