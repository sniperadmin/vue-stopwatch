import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/main.css'
import * as firebase from "firebase";
import Notifications from 'vue-notification'

Vue.use(Notifications)

import VueParticles from "vue-particles";
Vue.use(VueParticles);

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

// const messaging = firebase.messaging();

// 1. Generate a new key pair

// messaging.usePublicVapidKey('BLKHaI2WcEyLWR8HdCjXZVssNyiP26sHzhp7L-CLdw35tCnLZLd-8sRTBotzWdsBRQNPDYzqHXUo5P1ezySA9AA'); 

// Request Permission of Notifications

// messaging.requestPermission().then(() => {
  // console.log('Notification permission granted.')
  // Vue.notify({
  //   group: 'foo',
  //   title: 'Notification permission granted',
  //   text: 'Hello user! Thanks for confirming!'
  // })
  
  // Get Token
  
  // messaging.getToken().then((token) => {
  
  // console.log(token)
//     Vue.notify({
//       group: 'foo',
//       title: 'Token provided',
//       text: `${token}`
//     })
//   })
// }).catch((err) => {
// console.log('Unable to get permission to notify.', err)
//   Vue.notify({
//     group: 'foo',
//     title: 'something wrong',
//     text: `Error => ${err}`
//   })
// })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
