import { readonly } from "../reactive/reactive";

describe("readonly", () => {
    it("happy path", () => {
        const original = {
            foo: 1
        };
        const observed = readonly(original);
        expect(observed).not.toBe(original);
        expect(observed.foo).toBe(1);   
    })
    it('warn after set value', () => {
        console.warn = jest.fn()
        const original = {
            foo: 1
        };
        const observed = readonly(original); 
        observed.foo = 2;
        expect(console.warn).toBeCalled();
    });
});