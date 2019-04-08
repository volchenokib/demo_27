import Vue from 'vue';
import Vuex from 'vuex';
import demo from '@/api/demo';

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
			// console.log('API_DATA_SUCCES', state.form.isReset);
		},
		API_DATA_FAILURE(state, error) {
			state.data.isLoding = false;
			state.button.isDisable = false;
			console.log(error);
		}
	},

	actions: {
		downloadFile(store, payload) {
			store.commit('API_DATA_PENDING');

			demo
				.fetchFile(payload)
				.then(response => {
					// server imitation
					setTimeout(() => {
						store.commit('API_DATA_SUCCES', true);
						store.dispatch('forceFileDownload', response);
					}, 1115000);
				})
				.catch(error => {
					store.commit('API_DATA_FAILURE', error);
				});
		},

		forceFileDownload(response) {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'file.png'); //or any other extension
			document.body.appendChild(link);
			link.click();
		}
	}
});
