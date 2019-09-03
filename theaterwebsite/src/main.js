// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from "axios"
import VueAxios from "vue-axios"
import 'bootstrap'
// loading動畫
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
// vue 表單驗證套件
import VeeValidate, { Validator } from 'vee-validate'
// 表單驗證中文化套件
import VueI18n from 'vue-i18n'
import zhTW from "vee-validate/dist/locale/zh_TW"
// 自定義組件以及路由
import App from './App'
import router from './router'
Vue.config.productionTip = false
// 允許跨域時攜帶cookie到server,但是server端也須要有相應的設置
//加上之後反而有跨域的問題
// axios.defaults.withCredentials = true
Vue.use(VueAxios, axios)
// 使用vee validate套件
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'zhTW'
});
Vue.use(VeeValidate, {
  i18n,
  dictionary: {
    zhTW
  }
});
// Vee validate2自定義驗證
const validate = value => {
  const regx = /^09\d{8}$/g;
  return regx.test(value);
}
const getMessage = field => `${field} 格式不正確`;
const myValidator = {
  getMessage,
  validate,
};
Validator.extend('phone', myValidator);
// 創建loading全域組件
Vue.component('loading', Loading)
/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
// point 如果已經登入或是註冊過就不讓使用者再次登入login及註冊頁面
// 跳轉時驗證
// 做頁面跳轉時觸發beforeEach
router.beforeEach((to, from, next) => {
  //不管跳轉至哪個頁面都會去檢驗是否有token
  const theatertoken = to.params.theatertoken;
  const isLogin = localStorage.getItem('theatertoken') === theatertoken;
  const isuser = localStorage.getItem('user');
  console.log(to);
  // 如果有登入則跳轉至指定頁面
  // 做頁面跳轉時如果沒登入則跳至登入頁面,登入頁面有快速註冊可跳至註冊頁面
  // 如果目前登入狀態為true時不允許客戶端訪問login,訪問時直接跳轉
  if (isLogin && to.path !== '/login') {
    next();
  } else if (isuser && to.path == '/login') {
    next('/homepage');
  } else {
    next();
  }
});