import axios from 'vue-axios'

const authAxios = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/'
})
//instance.defaults.headers.common['SOMETHING'] = 'something'
authAxios.defaults.headers['Content-Type'] = 'application/json';
export default authAxios