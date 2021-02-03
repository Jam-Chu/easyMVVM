import Observer from './util_class/Observer'


// 给obj的每一个对象绑定数据监听
export default function observe(obj) {
  // obj空对象或不是对象时，停止绑定数据监听
  if (typeof obj !== 'object' || [...Object.keys(obj)].length === 0) { return; }

  let ob;
  if (obj.__ob__) {
    ob = obj.__ob__;
  } else {
    ob = new Observer(obj)
  }
  return ob;
}