import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import loader from "vue-ui-preloader";
import axios from 'axios';
import VueAxios from 'vue-axios';
import Notifications from '@kyvg/vue3-notification';
import store from "./store/index"

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .use(loader)
  .use(VueAxios, axios)
  .use(Notifications)
  .use(store)
  .mount('#app')
