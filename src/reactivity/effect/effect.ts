class ReactiveEffect {
    private _fn: any;
    constructor(fn) {
        this._fn = fn;
    }
    run() {
        activeEffect = this;
        this._fn();
    }
}
let activeEffect; 
export function effect(fn) {
    // 1. 创建effect实例 为的是将effect添加到dep上
    const _effect = new ReactiveEffect(fn);
    // 2. 初始化时执行下fn
    _effect.run();
}

let targetMaps = new Map();
// targetMaps:{
//     target1: {
//         key1: [fn1, fn2],
//         key2: [fn1, fn2]
//     }
// }
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
}

export function trigger(target, key) {
    // 将收集到的fn执行
    const depsMap = targetMaps.get(target);
    const dep = depsMap.get(key);
    for (const effect of dep) {
        effect.run();
    }
}