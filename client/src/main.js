import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps,{
  load: {
    key: 'AIzaSyB8Kuuqox5tdxa0A12TrrAJdTSHr1WRnpk',
  }
});


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
