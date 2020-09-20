import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from "vuex-persistedstate";
import file_data from '../data.json';

Vue.use(Vuex);

let url = 'http://localhost:3000/api';
let fs = require('fs');

export const store = new Vuex.Store({
  state: {
    login: '123',
    loggIn: false,
    file_data_vuex: file_data
  },
  getters: {
    GET_USER_NAME: (state) => {
        return state.login
    },
    IS_LOGG_IN: (state) => {
        return state.loggIn
    },
    GET_TOKEN: (state) => {
        return state.token
    },
    GET_FILE_DATA: (state) => {
        return state.file_data_vuex
    },
    GET_ARTICLE: (state) => {
        return state.file_data_vuex.article
    },
    GET_COMMENTS: (state) => {
      return state.file_data_vuex.comments
    }
  },
  mutations: {
    USER_LOGIN: (state, user) => {
        state.login = user.login;
        state.loggIn = true;
    },
    CLEAR_DATA: (state) => {
        state.login = '';
        state.loggIn = false;
    },
    SET_FILE_DATA: (state, payload) => {
        state.file_data_vuex = payload
    }
  },
  actions: {
    /*
    В коде отправляются запросы к "серверу", однако они никогда не сработают, т.к. таких url не существует.
    Поэтому мы отправляем запрос к серверу, но вместо того, чтобы работать с его ответом, мы подставляем
    все данные в функции, которая запускается при возникновени ошибки.
    В остальном, думаю, по коду все понятно. 
    */
    SAVE_REG: (context, credentials) => {
      return new Promise((resolve, reject) => {
        if (axios({url: url+'/login_reg', data: credentials, method: 'POST' })){
          resolve(response);
        }else{
          reject(error);
        };
      }).catch(error => {

        let login = credentials.login;
        let password = credentials.password;
        let data = context.getters.GET_FILE_DATA;
        // Проверяем, есть ли в файле такая учетная запись
        if (typeof data[login] === "undefined"){
          // записываем данные в файл, а затем автоматически авторизуем пользователя
          data[login] = {'login': login, 'password': password};
          context.commit('SET_FILE_DATA', data);
          context.commit('USER_LOGIN', {login: login});
        }
      });
    },
    LOGIN_AUTH: (context, credentials) => {
        return new Promise((resolve, reject) => {
            if (axios({url: url+'/login', data: credentials, method: 'POST' })){
              resolve(response);
            }else{
              reject(error);
            }
        }).catch(error => {
          //т.к. верхний код никогда работать не будет, всю логику с костылями будем прописывать здесь
          let data = context.getters.GET_FILE_DATA;
          console.log(data)
          if (typeof data[credentials.login] !== "undefined" && data[credentials.login]['password'] === credentials.password) {
            let login = credentials.login;
            //let token = file_data[login]['token']
            //localStorage.setItem('token', token);
            //axios.defaults.headers.common['Authorization'] = token;
            context.commit('USER_LOGIN', {login: login});
          }
        });
    },
    LOGOUT: (context) => {
      return new Promise((resolve, reject) => {
        context.commit('CLEAR_DATA');
        resolve();
      })
    },
    SAVE_COMMENT: (context, credentials) => {
      return new Promise((resolve, reject) => {
        if (axios({url: url+'/comment_save', data: credentials, method: 'POST' })){
          resolve(response);
        }else{
          reject(error);
        };
      }).catch(error => {
        let comment = credentials.comment;
        let login = context.getters.GET_USER_NAME;
        let date = new Date();
        let data = context.getters.GET_FILE_DATA;
        data['comments'].push({'login': login, 'text': comment, 'date': date});
        context.commit('SET_FILE_DATA', data);
      });
    }
  },
  plugins: [createPersistedState()]
});
