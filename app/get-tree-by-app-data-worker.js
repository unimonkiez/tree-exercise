import getTreeByAppData from './common/get-tree-by-app-data.js';

self.onmessage = e => {
  const { args } = e.data;
  self.postMessage(getTreeByAppData(...args));
};
