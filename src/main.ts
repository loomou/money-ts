import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dayjs from "dayjs";
import Nav from './components/Layout/Nav.vue'
import Title from './components/Layout/Title.vue'
import Layout from './components/Layout/Layout.vue'
import {DatetimePicker, Popup, Dialog} from 'vant';
import 'vant/lib/datetime-picker/style';
import 'vant/lib/popup/style';
import './libs/svg/svg.js';
import 'vant/lib/dialog/style'



const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
const isToday = require('dayjs/plugin/isToday')
dayjs.extend(isSameOrBefore)
dayjs.extend(isToday)

Vue.use(DatetimePicker);
Vue.use(Popup);
Vue.use(Dialog);
Vue.component('Navs', Nav);
Vue.component('Titles', Title);
Vue.component('Layout', Layout);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window.onload = function () {
  setTimeout(function () {
    window.scrollTo(0, 1000);
  }, 0);
};
