import Vue from 'vue';
import App from "./app.vue";
import {store} from './store/index.js';

//const router = require('./router.js')
//const router = () => import('./router.js').then(m => m.default)
import router from './router.js';

Vue.config.productionTip = false;

export default new Vue({
  store: store,
  router: router,
  render: h => h(App)
}).$mount('#app');
