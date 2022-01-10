import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import userConfig from "../config/user.json";
import store from "../store/index"
Vue.use(VueRouter)
const DeviceList = function (state, next) {
  return store
    .dispatch("user/lostDeviceList", { state, page: 0, size: userConfig.limit, filter: "all", keyword: "" ,type:"lostDeviceList"})
    .then((res) => {
      res ? next() : next({ name: 'Home' });
    });
}

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => {
		if (err.name !== 'NavigationDuplicated') throw err;
	});
};
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/info',
    beforeEnter: (to, from, next) => {
      store.dispatch("GetLanguage","admin");
      store.dispatch("MyInfo").then(res=>{
        if(res){
          next();

        }
      })
    },
    children: [
      {
        path: '/info',
        name: 'Info',
        // redirect: '/info/user',
        component: () => import('@/views/UserInfo.vue'),
        children: [
          {
            path: '/info/user',
            name: 'UserInfo',
            component: () => import('@/components/user/userInfo.vue'),
            beforeEnter: (to, from, next) => {
              // DeviceList(true, next)
              next();
            },
          },
          {
            path: '/info/register',
            name: 'Register',
            component: () => import('@/components/user/userInfo.vue'),
            beforeEnter: (to, from, next) => {
              DeviceList(true, next)

            },
          },
          {
            path: '/info/lostdevice',
            name: 'Lost',
            component: () => import('@/components/user/userInfo.vue'),
            beforeEnter: (to, from, next) => {
              DeviceList(false, next)

            },
          }
        ]
      },

    ],
  },
  {
    path: 'login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

import axios from 'axios';
router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next();
    return;
  } else {
    axios({
      method: 'get',
      url: `/api/login?type=Authority`,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        res.data.UserName === "Anonymous" ? next({ name: 'login' }) : next();
      })

  }
})


export default router
