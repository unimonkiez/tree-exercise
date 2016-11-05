export default name => (...args) => new Promise(resolve => {
  const worker = new Worker(name);
  worker.postMessage({ args });
  worker.onmessage = e => {
    resolve(e.data);
  };
});
