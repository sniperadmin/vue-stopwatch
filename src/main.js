import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/main.css'
import * as firebase from "firebase"
import Notifications from 'vue-notification'

Vue.use(Notifications)

import VueParticles from "vue-particles"
Vue.use(VueParticles)

window.Fire = new Vue()

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBtH3XCGJLN5NQmR0DUHuUSYvoo9JmvNwA",
  authDomain: "stopwatch-f179e.firebaseapp.com",
  databaseURL: "https://stopwatch-f179e.firebaseio.com",
  projectId: "stopwatch-f179e",
  storageBucket: "stopwatch-f179e.appspot.com",
  messagingSenderId: "497007181926",
  appId: "1:497007181926:web:af189898e6dba72a972da7",
  measurementId: "G-31MQ4SDT80"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// firebase.analytics()


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
