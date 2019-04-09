import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import demo1 from "@/components/demo1.vue";

// describe("HelloWorld.vue", () => {
// 	Vue.use(Vuetify);

// 	it("renders props.msg when passed", () => {
// 		const msg = "new message";
// 		const wrapper = shallowMount(HelloWorld, {
// 			propsData: { msg }
// 		});
// 		expect(wrapper.text()).toMatch(msg);
// 	});
// });

describe("demo1.vue", () => {
	Vue.use(Vuetify);
	Vue.use(Vuex);

	let getters;
	let store;

	store = new Vuex.Store({
		getters
	});

	it("component is rendered", () => {
		const wrapper = mount(demo1, { store });
		// expect(wrapper.html()).toContain('<span class="count">0</span>');
		// expect(wrapper.contains("v-container-stub")).toBe(true);

		// let btn = wrapper.find('.btn-edit');
		// expect(btn.exists()).toBe(true);

		expect(wrapper.contains("div")).toBe(true);
	});
});
