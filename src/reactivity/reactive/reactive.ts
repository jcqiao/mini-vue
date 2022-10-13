import { track, trigger } from "../effect/effect";
import { mutibleHandler, readonlyHandler } from "./baseHandler";

export const enum ReactiveFlags {
    IS_REACTIVE =  "__v_isReactive",
    IS_READONLY =  "__v_isReadOnly",
} 

export function reactive(raw) {
    return createReactiveObject(raw, mutibleHandler)
}
/**
 * 只读对象
 * @param raw object
 * @returns proxy
 */
export function readonly(raw) {
    return createReactiveObject(raw, readonlyHandler)
}

export function isReactive(value) {
    return !!value[ReactiveFlags.IS_REACTIVE];
}

export function isReadOnly(value) {
    return !!value[ReactiveFlags.IS_READONLY];
}

function createReactiveObject(target, baseHandler) {
    return new Proxy(target, baseHandler);
}