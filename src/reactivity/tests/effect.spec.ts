import { effect } from "../effect/effect";
import { reactive } from "../reactive/reactive";

describe('effect', () => {
    it.skip('happy path ', () => {
        const user = reactive({
            age: 10,
        });
        let newAage;
        effect(() => 
            newAage = user.age + 1);
        expect(newAage).toBe(11)
        // update
        user.age = 12;
        expect(newAage).toBe(13) 
    });
    it.skip('should return runner when call effect', () => {
        let foo = 10;
        let runner = effect(() => {
            foo++;
            return "foo"
        });
        expect(foo).toBe(11);
        const r = runner();
        expect(r).toBe("foo");
    });
    it('should run scheduler if scheduler option exist', () => {
        let run, dummy;
        const scheduler = jest.fn(() => run = runner);
        const obj = reactive({foo: 1});
        const runner = effect(() => {
            dummy = obj.foo;
        }, { scheduler });
        expect(scheduler).not.toHaveBeenCalled();
        expect(dummy).toBe(1);
        obj.foo++;
        expect(scheduler).toHaveBeenCalledTimes(1);
        expect(dummy).toBe(1);
        run();
        expect(dummy).toBe(2); 
    });
});