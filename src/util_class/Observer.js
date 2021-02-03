// 每个对象被监听，都要加上Observer类的实例，创建实例时会完成对对象的所有key进行劫持
import defineReactive from "../defineReactive";
import proto from '../arrayProto'
import Dep from "./Dep";


// ob实例对象将被挂载为每一个obj（包括根级别和对象类型的子级别）的一个属性__ob__。
// __ob__身上会有walk方法等方法，便以带有__ob__的对象管理其自身的响应式属性
export default class Observer {
  constructor(obj) {
    // 给对象初始化__ob__
    Object.defineProperty(obj, '__ob__', {
      value: this,
      enumerable: false,
      writable: true,
      configurable: true
    })
    this.dep = new Dep();
    // 如果obj是数组，则不需要walk内部所有项了
    if (Array.isArray(obj)) {
      obj.__proto__ = proto;
    } else {
      // 如果是对象，则需要walk内部所有项
      this.walk(obj)
    }
  }
  // 遍历其所有属性，并将其绑定监听
  walk(obj) {
    let keys = [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)]
    keys.forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}