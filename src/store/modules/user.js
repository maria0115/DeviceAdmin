import actions from "./user/actions";
import mutations from "./user/mutations";
import { dataStore } from './user/modules';
// import config from '../../config/user.json';
// import createPersistedState from 'vuex-persistedstate';
export default {
    modules: {
      store: dataStore,
    },
    // plugins: [dataState],
    namespaced: true,
    actions,
    mutations,
    state: {
        list:[],
        org:[],
        option: {
          page: 0,
          filter: "all",
          keyword: "",
        },
        
        name:"UserInfo",
    },
    getters: {
    //   GetNowRoom: (state) => {
    //     return state.store.nowroom;
    //   },
    }
  }