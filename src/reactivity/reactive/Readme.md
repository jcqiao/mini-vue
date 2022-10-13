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
