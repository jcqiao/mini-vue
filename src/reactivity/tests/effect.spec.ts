import { effect } from "../effect/effect";
import { reactive } from "../reactive/reactive";

describe('effect', () => {
    it('happy path ', () => {
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
    it('should return runner when call effect', () => {
        let foo = 10;
        let runner = effect(() => {
            foo++;
            return "foo"
        });
        expect(foo).toBe(11);
        const r = runner();
        expect(r).toBe("foo");
    });
});