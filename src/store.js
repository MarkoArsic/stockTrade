import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import authAxios from './axios-auth'
// import stockAxios from './axios-stocks'
import testAxios from './allAxios'
//import router from './router'

import stocks from '@/data/stocks'

axios.defaults.baseURL = `https://vue-stock-trader-a06ef.firebaseio.com/`

Vue.use(VueAxios, axios)
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    stocks:[],
    myStocks:[],
    funds: 0,
    idToken: null,
    userId: null,
    user: null
  },
  mutations: {
    'SET_STOCKS' (state, data) {
      state.stocks = data; 
    },
    // 'RAND_STOCKS' (state) {
    //     state.stocks.forEach(stock => {
    //       stock.price = Math.round(stock.price * ( 1+ Math.random() -0.5));
    //     });
    // },
    'BUY_STOCK' (state, {stockSymbol, stockPrice, stockQuantity}) {
      // check if bought stock is already in my stocks
      const record = state.myStocks.find(element => element.symbol == stockSymbol);
      if (record){
        record.quantity += stockQuantity;
      } else {
        state.myStocks.push({
          symbol: stockSymbol,
          quantity: stockQuantity       
        });
      }
      state.funds -= stockPrice * stockQuantity;
    },
    'SELL_STOCK' (state, {stockSymbol, stockPrice, stockQuantity}) {
      const record = state.myStocks.find(element => element.symbol == stockSymbol);
      if(record.quantity > stockQuantity){
        record.quantity -= stockQuantity;
      } else {
        state.myStocks.splice(state.myStocks.indexOf(record), 1);
      }
      state.funds += stockPrice * stockQuantity;
    },
    'SET_FUNDS' (state, {funds}) {
      state.funds = funds;
      console.log(funds);
    },
    'SET_PORTFOLIO' (state, portfolio) {
      state.funds = portfolio.funds;
      state.myStocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : [];
    },
    'AUTH_USER' (state, userData){
      state.idToken = userData.token;
      state.userId = userData.userId; 
    },
    'STORE_USER' (state, user){
      state.user = user;
    },
    'LOG_OUT' (state){
      state.idToken = null;
      state.userId = null;
      state.myStocks = [];
      state.funds = 0;
    }
  },
  actions: {
    setLogOutTimer:({commit}, expirationTime) => {
      setTimeout(() => {
        commit('LOG_OUT')
      }, expirationTime * 1000)
    },
    buyStock: ({commit}, order) => {
      commit('BUY_STOCK', order);
    },
    initStocks: ({commit}) => {
      const apiKey = '8vqefBvic8gH9ZfyG44TvZ5Lm6KhtWUfeUgPuzNiY6vK1TMwXAuIaXnNV4Ji'
      testAxios.axiosStocks.get('?symbol=BAMXF,GOOG,AAPL,MSFT&api_token=' + apiKey )
      .then(res => {
        const data = res.data.data;
        console.log(data)
        commit('SET_STOCKS', data);
      })
      .catch(err => {
        console.error(err); 
      })

       //from data/stocks.js
    },
    // randomizeStocks: ({commit}) => {
    //   commit('RAND_STOCKS'); //for portfolio view
    // },
    sellStock: ({commit}, order) => {
      commit('SELL_STOCK', order);
    },
    setFunds: ({commit}, newfunds) => {
      commit('SET_FUNDS', newfunds);
    },
    loadData: ({commit}) => {
      const token = localStorage.getItem('token')
      // '/users/' + localStorage.getItem('userId') + '/data.json'
      axios.get('/users/' + localStorage.getItem('userId') + '/data.json' + '?auth=' + token).then((response) => {
        console.log(response.data);
        if(response.data){
          console.log('Data Loaded!');
          //const stocks = response.data.stocks;
          const funds = response.data.funds;
          const stockPortfolio = response.data.stockPortfolio;

          const portfolio = {
            stockPortfolio,
            funds
          }

          //commit('SET_STOCKS', stocks);
          commit('SET_PORTFOLIO', portfolio);
        }
      })
    },
    register({commit, dispatch}, registration) {
      testAxios.axiosAuth.post('accounts:signUp?key=AIzaSyCgjanCmfZAqy-w8QSlvZkvlU64f_4JZG0', {
        email: registration.email,
        password: registration.password,
        returnSecureToken: true
      })
      .then(response => {
        console.log(response);
        commit('AUTH_USER', {
          token: response.data.idToken,
          userId: response.data.localId
        })
        const now = new Date();
        const epirationDate = new Date(now.getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('epirationDate', epirationDate);
        localStorage.setItem('userId', response.data.localId);
        dispatch('storeUser', registration);
        dispatch('setLogOutTimer', response.data.expiresIn);
      })
      .catch(err => {
        console.error(err); 
      })
    },
    login({commit, dispatch}, login) {
      testAxios.axiosAuth.post('accounts:signInWithPassword?key=AIzaSyCgjanCmfZAqy-w8QSlvZkvlU64f_4JZG0', {
        email: login.email,
        password: login.password,
        returnSecureToken: true
      })
      .then(response => {
        console.log(response);
        commit('AUTH_USER', {
          token: response.data.idToken,
          userId: response.data.localId
        })
        const now = new Date();
        const epirationDate = new Date(now.getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('epirationDate', epirationDate);
        localStorage.setItem('userId', response.data.localId);
        dispatch('setLogOutTimer', response.data.expiresIn);
        dispatch('loadData');
      })
      .catch(err => {
        console.error(err); 
      })
    },
    tryAutoLogin({commit}){
      const token = localStorage.getItem('token')
      if(!token){
        return
      }
      const epirationDate = localStorage.getItem('epirationDate');
      const now = new Date();
      if(now >= epirationDate){
        return
      }
      const userId = localStorage.getItem('userId');
      commit('AUTH_USER', {
        token: token,
        userId: userId
      });
    },
    storeUser({commit, state}, registration) {
      if(!state.idToken){
        return
      }
      axios.post('/users/' + localStorage.getItem('userId') + '.json' + '?auth=' + state.idToken, registration)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.error(err); 
      })
    },
    fetchUser({commit, state}) {
      if(!state.idToken){
        return
      }
      axios.get('/users/' + localStorage.getItem('userId') + '.json' + '?auth=' + state.idToken)
      .then(res => {
        console.log(`Fetched users: + ${res.data}`);
        const users = [];
        for(let key in res.data){
          const user = res.data[key];
          user.id = localStorage.getItem('userId');
          users.push(user);
        }
        commit('STORE_USER', users[0]);
      })
    },
    logOut({commit}) { 
      commit('LOG_OUT');
      localStorage.removeItem('epirationDate');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    }
  },
  getters: {
    stocks: (state) => {
      return state.stocks;
    },
    stockPortfolio (state, getters) {
      //returning new array of myStocks, but with name and current price from global stocks, matched by symbol!
      return state.myStocks.map(stock => {
        const record = getters.stocks.find(element => element.symbol === stock.symbol);
        return {
          symbol: stock.symbol,
          quantity: stock.quantity,
          name: record.name,
          price: record.price
        }
      });
    },
    funds (state) {
      return state.funds;
    },
    user (state) {
      return state.user;
    },
    isAuthenticated (state) {
      return state.idToken !== null;
    }
  }
})
