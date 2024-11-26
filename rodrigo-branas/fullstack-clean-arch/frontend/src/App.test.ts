import { test, expect } from "vitest"
import { mount } from "@vue/test-utils"

import App from "./App.vue"

test("", async () => {
    const wrapper = mount(App, {})

    setTimeout(() => {
        expect(wrapper.findAll(".product-description").at(0)?.text()).toBe("A");
        expect(wrapper.findAll(".product-price").at(0)?.text()).toBe(100);

        expect(wrapper.findAll(".product-description").at(1)?.text()).toBe("B");
        expect(wrapper.findAll(".product-price").at(1)?.text()).toBe(200);

        expect(wrapper.findAll(".product-description").at(2)?.text()).toBe("C");
        expect(wrapper.findAll(".product-price").at(2)?.text()).toBe(400);
    }, 1000)
})
