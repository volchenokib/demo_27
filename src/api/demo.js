import Vue from 'vue';
import baseURL from '@/api/const';

export default {
	fetchFile(payload) {
		return Vue.http(
			{
				method: 'get',
				url: '',
				responseType: 'arraybuffer'
			},
			payload
		);
	}
};
