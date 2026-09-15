export class AsyncLocalStorage {
  constructor() {
    this.store = null;
  }
  disable() {}
  getStore() { return this.store; }
  run(store, callback, ...args) {
    this.store = store;
    try {
      return callback(...args);
    } finally {
      this.store = null;
    }
  }
  exit(callback, ...args) {
    const oldStore = this.store;
    this.store = null;
    try {
      return callback(...args);
    } finally {
      this.store = oldStore;
    }
  }
  enterWith(store) {
    this.store = store;
  }
}
export const executionAsyncId = () => 0;
export const triggerAsyncId = () => 0;
export const createHook = () => ({ enable: () => {}, disable: () => {} });
export default {
  AsyncLocalStorage,
  executionAsyncId,
  triggerAsyncId,
  createHook
};
