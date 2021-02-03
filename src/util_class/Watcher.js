import Dep from "./Dep";

let uid = 0;

// Watcher的某实例是用于监视某一个属性，当值变化时，触发一些东西。
// Watcher类将会在模板编译时用于new出一大堆watcher实例，监听每一个在模板中用到的数据
export default class Watcher {
  constructor(target, expression, callback = Function.prototype) {
    this.id = uid++;
    // 监视的对象obj
    this.target = target;
    // 得到具体的监视对象的某些属性，可以链式，eg：obj.a.b.c
    this.getter = parsePath(expression);
    // 外部传入的回调函数
    this.callback = callback;
    // 得到监视对象的具体属性的值，**一旦初始化就会进入依赖收集阶段**
    this.value = this.get();
  }
  // 进入依赖收集，以及后续得到自己监视对象的变化的值（此时Dep.target无效）
  get() {
    // 指出是自己这个watcher在监视这个属性，此时defineReactive中的getter就可以得到这个watcher（因为它把自己暴露到全局了）
    Dep.target = this;
    let val;
    try {
      // 获得它所监视的
      val = this.getter(this.target);
    } finally {
      // 结束依赖收集，取消对全局变量Dep.target的占用
      Dep.target = null
    }
    return val
  }
  // 更改触发
  update() {
    this.getAndInvoke(this.callback);
  }
  getAndInvoke(cb) {
    let newVal = this.get();
    if (newVal !== this.value || typeof newVal === 'object') {
      const oldValue = this.value;
      this.value = newVal;
      cb.call(this.target, oldValue, newVal);
    }
  }
}

function parsePath(str) {
  let segArr = str.split('.');
  return (obj) => {
    segArr.forEach(seg => {
      if (!obj) return;
      obj = obj[seg]
    })
    return obj;
  }
}