// 劫持数据的方法。
// 对obj的第一层属性key进行劫持

import observe from "./observe";
import Dep from "./util_class/Dep";

export default function defineReactive(obj, key, val) {
  // 递归深层
  let childOb = observe(val)
  // 获得本层的dep
  let dep = obj.__ob__.dep;
  // 使得本层属性都是响应式的
  Object.defineProperty(obj, key, {
    get() {
      // 如果Dep.target存在
      // 说明此时这个属性在被get，且有人在watch它，所以要把watcher招进这个属性所在层的管理者__ob__.dep，而不是自己的dep
      if (Dep.target) { 
        dep.depend();
        // 给自己的（若是个对象）dep添加watcher
        if(childOb) {
          childOb.dep.depend();
        } 
      }
      return val;
    },
    set(newVal) {
      if (typeof newVal === 'object') {
        observe(newVal)
      }
      val = newVal
      // 触发更新
      dep.notify();
    }
  })
}