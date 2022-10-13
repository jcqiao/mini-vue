# reactive做了两件事 
   1. 从original代理一个对象observed
   2. 访问代理对象observed能获取到original的值
## proxy : get set
    get: 将effect中的fn收集
    set: 将收集的fn依次执行

# readonly
   readonly 创建只读响应式对象 不可更改
   与reactive的区别
   1. 不可进行set 并报错
   2. 因为无法set 所以不需要响应式依赖收集

# isReactive(obj)
   在实现proxy get时已经有了isReadOnly属性判断是否是响应式 所以增加一个私有属性__v_isReactive 当target[__v_isReactive]时 触发get 判断key是否是__v_isReactive 是就是触发isReactive() return !isReadOnly即可
   若target是一个普通对象 那么就不会触发get 那么target[__v_isReactive] = undefined return !!target[__v_isReactive]

# isReadOnly(obj)
   与实现isReactive类似