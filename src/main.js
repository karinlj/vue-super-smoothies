import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase";

Vue.config.productionTip = false;
//NÅT JAG INTE FATTAR HÄR
//wait for firebase to init before creating the app
let app = null;
//detect when there is a state change in Auth-when someone is logged in or out
firebase.auth().onAuthStateChanged(() => {
  //only want to init the app once: when site first loaded or reloaded
  //vill bara gå in om app=null
  if (!app) {
    app = new Vue({
      router: router,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
