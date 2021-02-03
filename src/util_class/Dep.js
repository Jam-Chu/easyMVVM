// class文件时闭包的，所以每次new Dep并不会重新创建uid，而是叠加
let uid = 0;
// 每一个对象都有一个Dep来管理自己的属性
export default class Dep {
  constructor() {
    // 有一个数组来存储自己的订阅者
    this.subs = [];
    // Dep编号
    this.id = uid++;
  }
  // 收集依赖
  depend() {
    if (Dep.target && !this.subs.includes(Dep.target)) {
      this._addSub(Dep.target);
    }
  }
  // 添加订阅，外部不可用，外部通过depend添加依赖（订阅者）
  _addSub(sub) {
    this.subs.push(sub);
  }
  // 移除订阅
  removeSub() { }
  // 发布
  notify() {
    // 触发每个订阅者的update方法
    this.subs.forEach(sub => {
      sub.update();
    })
  }
}