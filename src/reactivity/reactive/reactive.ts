import { track, trigger } from "../effect/effect";
import { mutibleHandler, readonlyHandler } from "./baseHandler";


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

function createReactiveObject(target, baseHandler) {
    return new Proxy(target, baseHandler)
}