import Vue from 'vue';

import Cookies from 'js-cookie';

import 'normalize.css/normalize.css'; // a modern alternative to CSS resets

import Element from 'element-ui';
import './styles/element-variables.scss';
import '@/config/other/css.js'; // 导入全局使用自定义组件
import '@/styles/index.scss'; // global css
import '@/utils'; // xy-utils 初始化
import App from './App';
import store from './store';
import axios from 'axios';
import router from './router';
import qs from 'qs';
Vue.prototype.qs = qs;
// 指定格式，form格式
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

import './icons'; // icon
import './permission'; // permission control
import './utils/error-log'; // error log

import * as filters from './filters'; // global filters

import '@/config/other/components'; // 导入全局使用自定义组件

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock');
  mockXHR();
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
});

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
