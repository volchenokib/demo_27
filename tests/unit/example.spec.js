import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import mockAxios from "axios";
import demo1 from "@/components/demo1.vue";
import downloadFile from "@/api/demo.js";

const localVue = createLocalVue();

Vue.use(Vuetify);
localVue.use(Vuex);

let getters;
let actions;
let store;

store = new Vuex.Store({
	getters,
	actions
});

describe("demo1.vue", () => {
	const wrapper = mount(demo1, { store, localVue });
	const vm = wrapper.vm;

	it("component renders correctly", () => {
		expect(wrapper.element).toMatchSnapshot();
	});

	it("component has a button", () => {
		expect(wrapper.contains("button")).toBe(true);
	});

	it("button text is correct", () => {
		const buttonContent = wrapper.find(".v-btn__content");
		expect(buttonContent.text()).toMatch("сформировать");
	});

	it("error messages is visible", () => {
		wrapper.find("button").trigger("click");
		const errMsg = wrapper.find(".v-messages__message");
		expect(errMsg.isVisible()).toBe(true);
	});

	it("preloader is works fine", () => {
		const textInput = wrapper.findAll('input[type="text"]');
		textInput.setValue("2018-05-03");
		wrapper.find("button").trigger("click");
		const buttonContent = wrapper.find(".v-btn__loading");
		expect(buttonContent.isVisible()).toBe(true);
	});

	// it('preloader is works fine', () => {
	// 	wrapper.setData({
	// 		formattedDateTo: '10.02.2018',
	// 		formattedDateFrom: '23.01.2019'
	// 	});
	// 	wrapper.find('button').trigger('click');
	// 	expect(wrapper.find('.v-btn__loading').isVisible()).toBe(true);
	// });

	// it('button click should increment the count', () => {
	// 	const button = wrapper.find('button');
	// 	button.trigger('click');
	// 	// const download = jest.fn();
	// 	expect(wrapper.vm.download).toHaveBeenCalledTimes(1);
	// });
});
