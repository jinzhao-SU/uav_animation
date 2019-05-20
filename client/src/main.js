import Vue from 'vue'
import App from './App.vue'
import './assets/styles.less'

// Vue.use(VueGoogleMaps, {
//   load: {
//     key: "AIzaSyAp4rRcadgcMU4H6FiCrpVNCeM5tHD5yzc",
//     libraries: "places" // necessary for places input
//   }
// });

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
