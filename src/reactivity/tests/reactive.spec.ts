import { isReactive, reactive } from "../reactive/reactive";

describe('reactive', () => {
    it('happy path', () => {
        const original = {foo: 1};
        const observed = reactive(original);
        expect(observed).not.toBe(original);
        expect(observed.foo).toBe(1);        
        expect(isReactive(observed)).toBe(true);
        // 因为original不是proxy代理的 所以isReactive中不会调用get方法 所以target.value = undefined
        expect(isReactive(original)).toBe(false);
    });
});