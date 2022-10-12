class ActiveEffect {
    private _fn: any;
    constructor(fn) {
        this._fn = fn;
    }
    run() {
        this._fn();
    }
}





export function effect(fn) {
    // 1. 创建effect实例 为的是将effect添加到dep上
    const _effect = new ActiveEffect(fn);
    // 2. 初始化时执行下fn
    _effect.run();
}