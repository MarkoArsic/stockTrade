import Vue from 'vue'
import Vuex from 'vuex'
import {axiosAuth, cryptoAxios, userDataAxios} from '@/allAxios'
// import router from './router'



Vue.use(Vuex);
//Vue.use(axios);


export default new Vuex.Store({
  state: {
    stocks: [],
    myStocks: [],
    funds: 0,
    idToken: null,
    userId: null,
    user: null
  },

  //MUTATIONS

  mutations: {
    'SET_STOCKS'(state, data) {
      state.stocks = data;
    },
    'BUY_STOCK'(state, { stockSymbol, stockPrice, stockQuantity}) {
      // check if bought stock is already in my stocks
      const record = state.myStocks.find(element => element.symbol == stockSymbol);
      if (record) {
        record.quantity += stockQuantity;
      } else {
        state.myStocks.push({
          symbol: stockSymbol,
          quantity: stockQuantity,
          priceBought: stockPrice
        });
      }
      state.funds -= stockPrice * stockQuantity;
    },
    'SELL_STOCK'(state, { stockSymbol, stockPrice, stockQuantity }) {
      const record = state.myStocks.find(element => element.symbol == stockSymbol);
      if (record.quantity > stockQuantity) {
        record.quantity -= stockQuantity;
      } else {
        state.myStocks.splice(state.myStocks.indexOf(record), 1);
      }
      state.funds += stockPrice * stockQuantity;
    },
    'SET_FUNDS'(state, { funds }) {
      state.funds = funds;
      console.log(funds);
    },
    'SET_PORTFOLIO'(state, portfolio) {
      state.funds = portfolio.funds;
      state.myStocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : [];
    },
    'AUTH_USER'(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
    },
    'STORE_USER'(state, user) {
      state.user = user;
    },
    'LOG_OUT'(state) {
      state.idToken = null;
      state.userId = null;
      state.myStocks = [];
      state.funds = 0;
    }
  },

  // ACTIONS

  actions: {
    setLogOutTimer: ({ commit }, expirationTime) => {
      setTimeout(() => {
        commit('LOG_OUT')
      }, expirationTime * 1000)
    },
    buyStock: ({ commit }, order) => {
      commit('BUY_STOCK', order);
    },
    initStocks: ({ commit }) => {
      const apiKey = '5e36c35158f1ed69115c546ab5c1fcb1';
      cryptoAxios.get('/currencies/ticker?key=' + apiKey + '&ids=BTC,ETH,XRP,BCH,BSV,LTC,USDT,EOS,BNB,XTZ,ADA,OKB,LINK,XMR,XLM,NEO,LEO,XEM,BTG,BTT,BCN&interval=1d,30d&convert=EUR')
          .then(res => {
            console.log(res.data);
            commit('SET_STOCKS', res.data);
          })
          .catch(err => {
            console.error(err);
            
          })
    },
    sellStock: ({ commit }, order) => {
      commit('SELL_STOCK', order);
    },
    setFunds: ({ commit }, newfunds) => {
      commit('SET_FUNDS', newfunds);
    },
    loadData: ({ commit }) => {
      const token = localStorage.getItem('token')
      userDataAxios.get('/users/' + localStorage.getItem('userId') + '/data.json' + '?auth=' + token).then((response) => {
        console.log(response.data);
        if (response.data) {
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
    // loadData: ({commit}, data) => {
    //   const userId = localStorage.getItem("userId");
    //   const token = localStorage.getItem("token");
    //   "/users/" + localStorage.getItem("userId") + "/data.json";
    //   this.axios
    //     .put("/users/" + userId + "/data.json" + "?auth=" + token, data)
    //     .then(response => {
    //       console.log("Data saved: " + response.data);
    //     });
    // },
    register({ commit, dispatch }, registration) {
      const key = 'AIzaSyCgjanCmfZAqy-w8QSlvZkvlU64f_4JZG0';
      axiosAuth.post(`accounts:signUp?key=${key}`, {
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
    login({ commit, dispatch }, login) {
      const key = 'AIzaSyCgjanCmfZAqy-w8QSlvZkvlU64f_4JZG0';
      axiosAuth.post('accounts:signInWithPassword?key=' + key, {
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
    tryAutoLogin({ commit }) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const epirationDate = localStorage.getItem('epirationDate');
      const now = new Date();
      if (now >= epirationDate) {
        return
      }
      const userId = localStorage.getItem('userId');
      commit('AUTH_USER', {
        token: token,
        userId: userId
      });
    },
    storeUser({ commit, state }, registration) {
      if (!state.idToken) {
        return
      }
      userDataAxios.post('/users/' + localStorage.getItem('userId') + '.json' + '?auth=' + state.idToken, registration)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.error(err);
        })
    },
    fetchUser({ commit, state }) {
      if (!state.idToken) {
        return
      }
      userDataAxios.get('/users/' + localStorage.getItem('userId') + '.json' + '?auth=' + state.idToken)
        .then(res => {
          console.log(`Fetched users: + ${res.data}`);
          const users = [];
          for (let key in res.data) {
            const user = res.data[key];
            user.id = localStorage.getItem('userId');
            users.push(user);
          }
          commit('STORE_USER', users[0]);
        })
    },
    logOut({ commit }) {
      commit('LOG_OUT');
      localStorage.removeItem('epirationDate');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    }
  },

  // GETTERS

  getters: {
    stocks: (state) => {
      return state.stocks;
    },
    stockPortfolio(state, getters) {
      //returning new array of myStocks, but with name and current price from global stocks, matched by symbol!
      return state.myStocks.map(stock => {
        const record = getters.stocks.find(element => element.symbol === stock.symbol);
        return {
          symbol: stock.symbol,
          quantity: stock.quantity,
          name: record.name,
          price: record.price,
          priceBought: stock.priceBought,
          market_cap: record.market_cap,
          logo_url: record.logo_url,
          price_date: record.price_date
        }
      });
    },
    funds(state) {
      return state.funds;
    },
    user(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return state.idToken !== null;
    }
  }
})
