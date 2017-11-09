// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueClipboard from 'vue-clipboard2';
import App from './App';

Vue.use(VueRouter);
Vue.use(VueClipboard);
Vue.config.productionTip = false;

const routes = [
  { path: '/', component: App },
];

const router = new VueRouter({
  routes,
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
});
