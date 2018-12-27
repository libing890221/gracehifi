// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import $ from 'jquery'

import Vuelidate from 'vuelidate'
import Croppa from 'vue-croppa'
import store from './store/store'
import VueDND from 'awe-dnd'
import 'babel-polyfill'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyLoad from 'vue-lazyload'
import VueKindEditor from 'vue-kindeditor'
import 'kindeditor/kindeditor-all-min.js'
import 'kindeditor/themes/default/default.css'
import MetaInfo from 'vue-meta-info'
axios.defaults.baseURL = 'http://new.gracehifi.com/'


require('es6-promise').polyfill();
require('es6-promise/auto');

Vue.config.productionTip = false;
Vue.prototype.$http=axios;

Vue.use(VueKindEditor);
Vue.use(Vuelidate);
Vue.use(Croppa);
Vue.use(VueDND);
Vue.use(MetaInfo);
Vue.use(VueLazyLoad,{
  error:'../../../static/images/mrmrmr.png',//加载错误时的显示图片
  loading:'../../../static/images/loading.gif'//加载过程中的过渡图片
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  components: { App },
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  },
  created(){
    if(localStorage.getItem("author") === null){
      localStorage.setItem("author","");
    }
    this.$store.state.user.author = localStorage.getItem("author");
  },
  template: '<App/>'
})
