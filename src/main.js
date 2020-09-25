import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueSpeech from "vue-speech";
import vuetify from "./plugins/vuetify";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faHome,
  faQuestion,
  faLightbulb,
  faFileAlt,
  faSmileBeam,
  faBars,
  faCheck,
  faEdit,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import VueSweetalert2 from "vue-sweetalert2";

// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";

Vue.use(VueSweetalert2);
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(VueSpeech);
library.add(
  faHome,
  faQuestion,
  faLightbulb,
  faFileAlt,
  faSmileBeam,
  faBars,
  faCheck,
  faEdit,
  faSave
);

Vue.config.productionTip = false;
Vue.component("font-awesome-icon", FontAwesomeIcon);
new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
