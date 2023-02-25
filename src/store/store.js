import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      // mock data
      products: [
        {
          title: 'Yanjing',
          quantity: '704',
          price: '1000786'
        },
        {
          title: 'Icehouse',
          quantity: '830',
          price: '868853'
        },
        {
          title: 'Jameson',
          quantity: '73',
          price: '134030'
        },
        {
          title: 'Granini',
          quantity: '639',
          price: '410217'
        }
      ],
      userInfo: {
        isLoggedIn: false,
        name: 'Kevin Eka P',
        username: 'string',
        password: 'string',
        birthday: '28 Apr 1998',
        age: '24',
        education: 'Sarjana',
        email: ''
      }
    },
    getters: {
      getLoggedIn: state => {
        return state.userInfo.isLoggedIn;
      },
      getName: state => {
        return state.userInfo.name;
      },
      getBirthday: state => {
        return state.userInfo.birthday;
      },
      getAge: state => {
        return state.userInfo.age;
      },
      getEducation: state => {
        return state.userInfo.education;
      },
      getPassword: state => {
        return state.userInfo.password;
      }
    },
    mutations: {
      setLoggedIn: (state, isLoggedIn) => {
        state.userInfo.isLoggedIn = isLoggedIn;
      },
      setPassword: (state, pwd) => {
        state.userInfo.password = pwd;
      }
    }
})
