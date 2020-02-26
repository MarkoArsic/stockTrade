import axios from 'axios'


const axiosAuth = axios.create({
    //Firebase Auth
    baseURL: 'https://identitytoolkit.googleapis.com/v1/'
});

const cryptoAxios = axios.create({
    //cryptocurrency API
    baseURL: 'https://api.nomics.com/v1'
});


const userDataAxios = axios.create({
    //Save and Load data To Firebase
    baseURL: 'https://vue-stock-trader-a06ef.firebaseio.com/'
});
//instance.defaults.headers.common['SOMETHING'] = 'something'
//instance.defaults.headers.post['Content-Type'] = 'application/json';
// axios interceptors
//axiosStocks.interceptors.request.use(config => {
// Do something before request is sent
//alert('INTERSEPTOR !');
//console.log('Request interceptor' + config);
//return config;
//},error => {
// Do something with request error
//return Promise.reject(error);
//});
export {
        axiosAuth, 
        cryptoAxios, 
        userDataAxios
};