import { track, trigger } from "../effect/effect";

function createGetter(isReadonly = false) {
    return function get(target, key) {
        const res = Reflect.get(target, key);
            // TODO 收集依赖
        if (!isReadonly) {
            track(target, key);
        }
        return res;
    }
}
function createSetter() {
    return function set(target, key, value) {
        const res = Reflect.set(target, key, value);
        // TODO 依赖触发
        trigger(target, key);
        return res; 
    }
}
const get = createGetter();
const set = createSetter();
export function reactive(raw) {
    return new Proxy(raw, {
        // 每次调用reactive都会执行createGetter,createGetter 只要初始化时创建就可以了
        // get: createGetter(), 
        // set: createSetter()
        get,
        set
    })
}
/**
 * 只读对象
 * @param raw object
 * @returns proxy
 */
export function readonly(raw) {
    return new Proxy(raw, {
        get: createGetter(true),
        set(target, key: any, value) {
            console.warn(`key ${key} set failed becauseof target is readonly: ${target}`); 
            return true;
        },
    })
}