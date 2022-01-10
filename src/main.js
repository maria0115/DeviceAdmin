import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import jQuery from "jquery";
// import wheel from "jquery-mousewheel";
global.$ =jQuery;
// global['jquery-mousewheel'] = wheel;
import language from "@/mixins/language.js";
Vue.mixin(language)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
