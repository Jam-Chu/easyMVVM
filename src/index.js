import observe from './observe';
import $set from './reactiveSet';
import Watcher from './util_class/Watcher'


let obj = {
  a: 10,
  b: {
    c: {
      r: 101,
      s: 102,
      t: {
        qqq: 10000
      }
    },
    f: [1, 1, 2, 3]
  },
  d: [1, 2, 3]
}

observe(obj)
new Watcher(obj, 'b.c.t.qqq', function (oldVal, newVal) {
  // 此处可以做一些Diff算法的操作更新视图
  console.log('w0触发')
})
new Watcher(obj, 'b.c', function (oldVal, newVal) {
  console.log('w1触发')
})
new Watcher(obj, 'b.f', function (oldVal, newVal) {
  console.log('w2触发')
})
obj.b.f.splice(0,0,100);
console.log(obj)


