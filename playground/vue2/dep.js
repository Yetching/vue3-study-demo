//处理依赖收集和通知依赖更新

import { remove } from '../shared/util.js';

//同一个状态会有多个依赖，因此我们为每一个状态
//即每一个数据创建一个依赖数组存储他的依赖关系

export class Dep {
  constructor() {
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  removeSub(sub) {
    remove(this.subs, sub);
  }

  depend() {
    if (window.target) {
      this.addSub(window.target);
    }
  }

  //通知更新
  notify() {
    const subs = this.subs.slice();
    subs.forEach((sub) => {
      sub.update();
    });
  }
}
