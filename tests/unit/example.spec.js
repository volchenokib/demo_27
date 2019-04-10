import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import mockAxios from 'axios';
import demo1 from '@/components/demo1.vue';
import downloadFile from '@/api/demo.js';

Vue.use(Vuetify);
Vue.use(Vuex);

let getters;
let actions;
let store;

store = new Vuex.Store({
	getters,
	actions
});

describe('demo1.vue', () => {
	const wrapper = mount(demo1, { store });

	it('renders correctly', () => {
		expect(wrapper.element).toMatchSnapshot();
	});

	it('file download', async () => {
		// setup
		mockAxios.get.mockImplementationOnce(() =>
			Promise.resolve({
				data: { results: ['cat.jpg'] }
			})
		);

		// work
		const images = await downloadFile('cats');

		// expect
		expect(images).toEqual(['cat.jpg']);
		expect(mockAxios.get).toHaveBeenCalledTimes(1);
		expect(mockAxios.get).toHaveBeenCalledWith(
			'https://78.media.tumblr.com/tumblr_m39nv7PcCU1r326q7o1_500.png',
			{
				// params: {
				// 	client_id: process.env.REACT_APP_UNSPLASH_TOKEN,
				// 	query: "cats"
				// }
			}
		);
	});

	// it('submit button works correctly', () => {
	// 	const input = wrapper.findAll('input[type="text"]');
	// 	input.setValue('10.04.2019');
	// 	const button = wrapper.find('button');
	// 	button.trigger('click');

	// 	// assert event has been emitted
	// 	expect(wrapper.emitted().download).toBeTruthy();

	// 	// assert event count
	// 	expect(wrapper.emitted().download.length).toBe(1);
	// });
});
