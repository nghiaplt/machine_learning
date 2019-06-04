import Vue from 'vue'
import App from './App.vue'

import '../assets/app.styl'
import VueRouter from "vue-router"
import routes from "./router";

import $ from "jquery";

window.$ = $;
Vue.use(VueRouter);


const router = new VueRouter({
  routes // short for `routes: routes`
});
window.onload = () => {
  new Vue({
    router,
    el: '#app',
    render: h => h(App)
  })
}
// gcloud compute --project "car-detection-241804" ssh --zone asia-southeast1-b instance-1

