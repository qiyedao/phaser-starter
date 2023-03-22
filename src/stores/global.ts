import { makeAutoObservable } from 'mobx';

class Global {
  time: number = new Date().getTime();
  constructor() {
    makeAutoObservable(this);
  }
  setTime(value: number) {
    this.time = value;
    return value;
  }
  *fetchValue(value: number) {
    return value;
  }
}
const global = new Global();
export default global;
