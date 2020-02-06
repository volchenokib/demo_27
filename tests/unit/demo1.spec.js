import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import { mount, createLocalVue } from '@vue/test-utils';
import demo1 from '@/components/demo1.vue';
import moxios from 'moxios';

const localVue = createLocalVue();

localVue.use(Vuetify);
localVue.use(Vuex);

let store;
let state;
let actions;
let mutations;
let commit;

actions = {
	downloadFile: jest.fn(),
	forceFileDownload: jest.fn()
};

store = new Vuex.Store({
	state: {},
	actions,
	mutations,
	commit
});

<<<<<<< HEAD
describe('download file pipeline', () => {
=======
describe('demo1 component', () => {
	// beforeEach(function() {
	// 	// import and pass your custom axios instance to this method
	// 	moxios.install();
	// });

	// afterEach(function() {
	// 	// import and pass your custom axios instance to this method
	// 	moxios.uninstall();
	// });

>>>>>>> d1f92c124917b298e2c3121e5aa746f15abbb324
	const wrapper = mount(demo1, { store, localVue });
	// const vm = wrapper.vm;

	// it('renders correctly', () => {
	// 	expect(wrapper.element).toMatchSnapshot();
	// });

	// it('date input error messages works correctly', () => {
	// 	wrapper.find('button').trigger('click');
	// 	const errMsg = wrapper.find('.v-messages__message');
	// 	expect(errMsg.isVisible()).toBe(true);
	// });

	describe('data capture', () => {
		const wrapper = mount(demo1, { store, localVue });

		it('exist', () => {
			expect(wrapper.contains('button')).toBe(true);
		});

		it('text is correct', () => {
			const buttonContent = wrapper.find('.v-btn__content');
			expect(buttonContent.text()).toMatch('сформировать');
		});

		it('runs action correctly', () => {
			const textInput = wrapper.findAll('input[type="text"]');
			textInput.setValue('01-01-2018');
			wrapper.find('button').trigger('click');
			expect(actions.downloadFile).toHaveBeenCalled();
			expect(actions.downloadFile).toHaveBeenCalledTimes(1);
			// expect(actions.downloadFile).toHaveBeenLastCalledWith(store, {
			// 	dateFrom: '01.01.2018',
			// 	dateTo: '01.01.2018',
			// 	purchaseType: 'singleProvider',
			// 	localStorage: false
			// });
		});
	});

	describe('sending data to the server', () => {
		const wrapper = mount(demo1, { store, localVue });
		it('step 1', () => {
			expect(wrapper.contains('button')).toBe(true);
		});

		it('step 2', () => {
			expect(wrapper.contains('button')).toBe(true);
		});
	});

	describe('server response processing', () => {
		it('step 1', () => {
			expect(wrapper.contains('button')).toBe(true);
		});

		it('step 2', () => {
			expect(wrapper.contains('button')).toBe(true);
		});

		it('step 3', () => {
			expect(wrapper.contains('button')).toBe(true);
		});
	});
});
