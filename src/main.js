import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vue2Filters from 'vue2-filters'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'


// axios defaults
axios.defaults.baseURL = `https://vue-stock-trader-a06ef.firebaseio.com`
// axios.defaults.headers.common['Authorisation'] = 'asdqew' 
//axios.defaults.headers.get['Accepts'] = 'application/json'

// // axios interceptors
// axios.interceptors.request.use(config => {
// // Do something before request is sent
// console.log('Request interceptor' + config);
// return config;
// },error => {
// // Do something with request error
// return Promise.reject(error);
// });

// axios.interceptors.response.use(response => {
// // Do something before response is sent
// console.log('Response interceptor' + response);
// return response;
// },error => {
// // Do something with response error
// return Promise.reject(error);
// });

Vue.use(Vue2Filters)
Vue.use(VueAxios, axios)
Vue.use(Vuelidate)

Vue.config.productionTip = false

Vue.directive('clickOutside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
        if (!(el == event.target || el.contains(event.target))) {
            vnode.context[binding.expression](event);}
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unbind: function (el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
    }
})

Vue.filter('customCurrency', (value) => {
  return value.toLocaleString() + '.00' + ' €';  
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
