import Vue from "vue";
import Vuetify from "vuetify/lib";
import ru from "vuetify/src/locale/ru.ts";
import "vuetify/src/stylus/app.styl";
import "@fortawesome/fontawesome-free/css/all.css"; // Ensure you are using css-loader

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoffee, faWallet, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faCoffee, faWallet, faTimes);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(Vuetify, {
	// iconfont: 'md',
	iconfont: "fa",
	icons: {
		wallet: "fas fa-wallet",
		close: "fas fa-times"
	},
	lang: {
		locales: { ru },
		current: "ru"
	},

	theme: {
		primary: "#7497a6",
		// secondary: '#B22222',
		accent: "#bce3c1",
		error: "#db8484",
		bg: "#db8484",

		indigo_1: "#154760",
		indigo_2: "#235a76",
		indigo_3: "#27607d",
		indigo_4: "#356e8b",
		indigo_5: "#547685",
		indigo_6: "#7497a6",
		indigo_7: "#82aabc",
		indigo_8: "#a8d4e8",
		indigo_9: "#cbe9f6",

		brown_1: "#292929",
		brown_2: "#3e3e3e",
		brown_3: "#525252",
		brown_4: "#666666",
		brown_5: "#7a7a7a",
		brown_6: "#8f8f8f",
		brown_7: "#c8c8c8",
		brown_8: "#efefef",
		brown_9: "#fafafa",

		green_1: "#82b487",
		green_2: "#95cc9b",
		green_3: "#bce3c1",
		green_4: "#d9f1dc",
		green_5: "#ecf2ed",

		blue_1: "#3490ca",
		blue_2: "#49a9e4",
		blue_3: "#66afdc",
		blue_4: "#89c7ed",
		blue_5: "#b9e3fd"
	}
});
