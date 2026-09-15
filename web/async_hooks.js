export class AsyncLocalStorage {
  getStore() {}
  run(store, callback) { return callback(); }
}
export class AsyncResource {
  constructor() {}
  bind(fn) { return fn; }
}
export function executionAsyncId() { return 0; }
export function triggerAsyncId() { return 0; }
export function createHook() { return { enable() {}, disable() {} }; }
export default { AsyncLocalStorage, AsyncResource, executionAsyncId, triggerAsyncId, createHook };
