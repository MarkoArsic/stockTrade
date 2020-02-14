import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.worldtradingdata.com/api/v1/stock'
})
//instance.defaults.headers.common['SOMETHING'] = 'something'
//instance.defaults.headers.post['Content-Type'] = 'application/json';
// axios interceptors
axios.interceptors.request.use(config => {
// Do something before request is sent
//alert('INTERSEPTOR !');
//console.log('Request interceptor' + config);
return config;
},error => {
// Do something with request error
return Promise.reject(error);
});
export default instance