import { extend } from "../../shared";

class ReactiveEffect {
    private _fn: any;
    deps = [];
    active = true; // active是为了优化stop多次调用删除已经被删除的effect
    onStop?: () => void;
    // 使用public声明的变量 外部effect可以直接调用到
    constructor(fn, public scheduler) {
        this._fn = fn;
    }
    run() {
        activeEffect = this;
        return this._fn();
    }
    stop() {
        // 通过当前effect 如何找到deps 在track中dep.add了activeEffect;反过来activeEffect中添加dep
       if (this.active) {
        cleanupEffect(this);
        if (this.onStop) {
            this.onStop();
        }
        this.active = false;
       }
    }
}
/**
 * 从响应式收集里删除当前effect
 * @param effect effect实例
 */
function cleanupEffect(effect: any) {
    effect.deps.forEach((dep) => {
        // dep是个set dep删除当前实例
        dep.delete(effect);
    })
}

let activeEffect; 
/**
 * 创建effect实例 并执行fn 返回run函数
 * @param fn function
 * @param options option
 * @returns runner function
 */
export function effect(fn, options:any = {}) {
    // 1. 创建effect实例 为的是将effect添加到dep上
    const _effect = new ReactiveEffect(fn, options.scheduler);
    // _effect.onStop = options.onStop;
    extend(_effect, options);
    // 2. 初始化时执行下fn
    _effect.run();
    const runner:any = _effect.run.bind(_effect);
    runner.effect = _effect;
    return runner
}

let targetMaps = new Map();
// targetMaps:{
//     target1: {
//         key1: [fn1, fn2],
//         key2: [fn1, fn2]
//     }
// }
/**
 * 收集响应式依赖
 * @param target obj
 * @param key key
 */
export function track(target, key) {
    // target -> key -> dep
    let depsMap = targetMaps.get(target); // 拿到key的map
    if (!depsMap) {
        depsMap = new Map();
        targetMaps.set(target, depsMap); 
    }
    let dep = depsMap.get(key);
    if (!dep) {
        dep = new Set();
        depsMap.set(key, dep); // 别忘记存起来
    }
    dep.add(activeEffect);
    // 反向收集当前effect的dep
    // activeEffect就是effect实例 所以deps声明在ReactiveEffect中即可
    // 若只是使用了reactive函数没有effect函数 那么不会有activeEffect
    if (activeEffect) {
        activeEffect.deps.push(dep);
    }
}

/**
 * 触发响应式依赖
 * @param target 
 * @param key 
 */
export function trigger(target, key) {
    // 将收集到的fn执行
    const depsMap = targetMaps.get(target);
    const dep = depsMap.get(key);
    for (const effect of dep) {
        if(effect.scheduler) {
            effect.scheduler();
        } else {
            effect.run();
        }
    }
}

/**
 * 停止当前effect的响应
 * @param runner fn
 */
export function stop(runner) {
    runner.effect.stop();
}