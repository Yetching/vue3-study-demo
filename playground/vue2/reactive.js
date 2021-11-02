//使Object数据变得可观测

import { def } from '../shared/util.js';
import { Dep } from './dep.js';

const car = {
  brand: 'BMW',
  price: 3000,
  owner: {
    name: 'Li',
    age: 23,
  },
};

/**
 * 将对象的某个属性转化成可观测
 * @param {Object} obj 转换对象
 * @param {String} key 对象的key
 * @param {Any} val key对应的值
 */

//箭头函数是没有自己的arguments
//使用rest剩余参数来代替(...rest)
//此时在函数内无法直接形参命名来操作
function defineReactive(obj, key, val) {
  if (arguments.length === 2) {
    val = obj[key];
  }
  if (typeof val === 'object') {
    new Observer(val);
  }
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      return val;
    },
    set(newVal) {
      if (val === newVal) {
        return;
      }
      // console.log(`${key}属性被修改`);
      val = newVal;
      dep.notify();
    },
  });
}

class Observer {
  constructor(value) {
    this.value = value;
    def(value, '__ob__', this);
    if (Array.isArray(value)) {
      //,,,
    } else {
      this.transform(value);
    }
  }

  transform(obj) {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key);
    });
  }
}

new Observer(car);
