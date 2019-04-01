import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import ru from "vuetify/es5/locale/ru";
// import ru from "vuetify/src/locale/ru.ts";

Vue.use(Vuetify, {
	lang: {
		locales: { ru },
		current: "ru"
	}
});

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
