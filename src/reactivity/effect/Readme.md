## target 中每个key要有一个依赖收集的容器--dep
1. 创建一个target map
2. 为target key创建一个map


## effect 实现scheduler

当effect配置了options scheduler，则在更新响应式值时则不再触发effect fn而是触发scheduler函数。若执行effect返回的函数runner则会再次调用fn。
当类中使用public声明的变量 可以在实例上直接获取到

## effect 实现stop功能

stop的功能是 停止响应更新；再调用runner时触发fn进行更新
性能优化 当前effect调用过一次后 应优化再多次调用 使用active控制

## effect 实现onStop功能

onStop作为effect第二个参数options传递，当调用stop功能后 会执行一次onStop功能 允许用户做一些其他功能