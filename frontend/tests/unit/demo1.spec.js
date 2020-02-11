import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import { mount, createLocalVue } from '@vue/test-utils';
import demo1 from '@/components/demo1.vue';
import moxios from 'moxios';

Vue.use(Vuex);
Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuex, Vuetify);

let wrapper;
let store;
let actions;
let mutations;
let commit;

actions = {
	downloadFile: jest.fn(),
	forceFileDownload: jest.fn()
};

let url = '';
let body = {};

jest.mock('axios', () => ({
	post: (_url, _body) => {
		return new Promise(resolve => {
			url = _url;
			body = _body;
			resolve(true);
		});
	}
}));

store = new Vuex.Store({
	state: {},
	actions,
	mutations,
	commit
});

beforeEach(() => {
	wrapper = mount(demo1, {
		sync: false,
		// propsData: {},
		// mocks: {},
		// stubs: {},
		// methods: {},
		store,
		localVue
	});
});

afterEach(() => {
	wrapper.destroy();
});

describe('download file pipeline', () => {
	it('download button exist', () => {
		expect(wrapper.contains({ ref: 'downloadButton' })).toBe(true);
	});
	it('by clicking on the download button, the download method starts', () => {
		// wrapper.setMethods({ download: jest.fn() });
		// wrapper.find({ ref: 'downloadButton' }).trigger('click');
		// expect(wrapper.vm.download).toHaveBeenCalled();
	});

	describe('download method works correctly', () => {
		// const wrapper = mount(demo1, { store, localVue });
		it('form validation started', () => {
			expect(wrapper.contains('button')).toBe(true);
		});
		it('if the form validation passed, downLoadFile method was dispatched with correct payload', () => {
			expect(wrapper.contains('button')).toBe(true);
		});

		// it('text is correct', () => {
		// 	const buttonContent = wrapper.find('.v-btn__content');
		// 	expect(buttonContent.text()).toMatch('сформировать');
		// });
		// it('runs action correctly', () => {
		// 	const textInput = wrapper.findAll('input[type="text"]');
		// 	textInput.setValue('01-01-2018');
		// 	wrapper.find('button').trigger('click');
		// 	expect(actions.downloadFile).toHaveBeenCalled();
		// 	expect(actions.downloadFile).toHaveBeenCalledTimes(1);
		// 	// expect(actions.downloadFile).toHaveBeenLastCalledWith(store, {
		// 	// 	dateFrom: '01.01.2018',
		// 	// 	dateTo: '01.01.2018',
		// 	// 	purchaseType: 'singleProvider',
		// 	// 	localStorage: false
		// 	// });
		// });
	});

	describe('downloadFile action works correctly', () => {
		it('correct API endpoint was used', async () => {
			await actions.downloadFile();

			expect(url).toBe('https://78.media.tumblr.com/tumblr_m39nv7PcCU1r326q7o1_500.png');
		});
		it('payload is correct', () => {});
		it('correct mutation was committed with the result', () => {});
	});

	describe('отправка запроса на сервер', () => {});

	describe('обработка ответа сервера', () => {});
});
