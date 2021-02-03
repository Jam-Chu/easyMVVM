// 给obj的key属性设置值

import defineReactive from "./defineReactive";

/* 
  使用：
  obj对象已有key的设置值
  obj对象未存在的key的值设置
  obj若是已有数组，则调用splice变异方法来修改
 */
export default function $set(obj, key, val) {
  // 如果obj是一个普通对象
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    if (obj[key] !== undefined) {
      obj[key] = val;
    } else {
      // 若不存在，则监听
      defineReactive(obj, key, val)
    }
  }
  // 如果是个数组，不可以使用arr[1] = 10的索引方式添加
  else if (Object.prototype.toString.call(obj) === '[object Array]') {
    obj.splice(key, 0, val)
  }
}