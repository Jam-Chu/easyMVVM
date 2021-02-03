// 处理以下数组方法增加监听，使其变异（这些方法都会改变原数组）
let methods = ['push', 'pop', 'shift', 'unshift', 'reverse', 'splice', 'sort'];
let proto = Object.create(Array.prototype);
methods.forEach(method => {
  proto[method] = function () {
    Array.prototype[method].call(this, ...arguments);
    // 数组变化也要update以下Watch自己的watcher
    let dep = this.__ob__.dep;
    console.log(dep)
    dep.notify();
  }
})

export default proto;