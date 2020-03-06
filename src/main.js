import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";

import Homepage from "./components/Homepage.vue";
import NotFound from "./components/NotFound.vue";


Vue.use(VueRouter)

const router = new VueRouter ({
  mode: 'history',
  routes: [
    { path: '/', component: Homepage},
    { path: '*', component: NotFound }
  ]
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
