import Vue from 'vue';
import VueRouter from 'vue-router';

//let HomePage = require('./pages/home/index.vue').default;
import HomePage from './pages/home/index.vue';
import SinglePage from './pages/singlepage/index.vue';

Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: 'HomePage',
  component: HomePage
},
{
  path: '/page',
  name: 'SinglePage',
  component: SinglePage
},
];

export default new VueRouter({
  mode: 'history',
  routes: routes
});
