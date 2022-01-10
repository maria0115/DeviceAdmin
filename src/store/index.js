import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import actions from './actions.js';
import mutations from './mutations.js';
import { dataStore } from './modules.js';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex)
const dataState = createPersistedState({
  paths: [
      'store.myinfo',
      "store.language",
  ]
})
export default new Vuex.Store({
  plugins: [dataState],
  state: {
    isCreated:false,
  },
  mutations,
  actions,
  modules: {
    user,
    store: dataStore,
  },
  getters: {
      GetMyInfo: (state) => {
        return state.store.myinfo;
      },
      GetLanguage: (state) => {
        return state.store.language;
      },
    }
})
