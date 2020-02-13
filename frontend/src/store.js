import Vue from 'vue';
import Vuex from 'vuex';
// import demo from '@/api/demo';
import axios from 'axios';
import { baseURL } from '@/api/const';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		data: {
			isLoding: false
		},

		form: {
			isReset: false
		},

		button: {
			isDisable: false
		}
	},

	getters: {
		getDataState(state) {
			return state.data.isLoding;
		},

		formResetNeed(state) {
			return state.form.isReset;
		},

		getButtonState(state) {
			return state.button.isDisable;
		}
	},

	mutations: {
		API_DATA_PENDING(state) {
			state.data.isLoding = true;
			state.button.isDisable = true;
		},

		API_DATA_SUCCES(state, payload) {
			state.data.isLoding = false;
			state.button.isDisable = false;
			state.form.isReset = payload;
		},

		API_DATA_FAILURE(state) {
			state.data.isLoding = false;
			state.button.isDisable = false;
		}
	},

	actions: {
		async getFile(store, payload) {
			try {
				store.commit('API_DATA_PENDING');
				const response = await axios.get(
					'http://localhost:8081/downloadFile',
					{
						responseType: 'arraybuffer'
					},
					payload
				);
				console.log('response', response);
				store.commit('API_DATA_SUCCES', true);
				return response;
			} catch (e) {
				console.log('Error', e);
				store.commit('API_DATA_FAILURE', e);
				return e;
			}
		}
	}
});
