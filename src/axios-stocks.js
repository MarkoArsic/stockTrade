import axios from 'vue-axios'

const stockAxios = axios.create({
    //cryptocurrency
    baseURL: 'https://api.nomics.com/v1'
})
//instance.defaults.headers.common['SOMETHING'] = 'something'
//stockAxios.defaults.headers.post['Content-Type'] = 'application/json';
// axios interceptors
//axios.interceptors.request.use(config => {
// Do something before request is sent
//alert('INTERSEPTOR !');
//console.log('Request interceptor' + config);
// return config;
// },error => {
// // Do something with request error
// return Promise.reject(error);
// });
export default stockAxios