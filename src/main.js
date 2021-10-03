import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import * as VeeValidate from 'vee-validate'
import 'bootstrap'
import App from './App.vue'
import router from './router'
import store from './store'
import './bus'
import dateFilter from './date'

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component('Loading', Loading);
Vue.use(AOS);
Vue.use(VeeValidate);
Vue.filter('date', dateFilter);

axios.defaults.withCredentials = true;
new Vue({
  created() {
    AOS.init({
      offset: 120,
      once: true,
      duration: 1500,
    });
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// router.beforeEach((to, from, next) => {
//   console.log('to:', to, 'from: ', from, 'next: ', next);
//   next();
// });
