# reactive做了两件事 
   1. 从original代理一个对象observed
   2. 访问代理对象observed能获取到original的值
## proxy : get set
    get: 将effect中的fn收集
    set: 将收集的fn依次执行


