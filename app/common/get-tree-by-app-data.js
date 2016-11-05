import { DIRECTORY, FILE, CLASS, METHOD } from 'app/constant/node-type.js';

const seperator = '/';

export default appData => {
  let tree;

  appData.methods.forEach(({ file, class_name, method_name }) => {
    const dirs = file.split(seperator);
    const fileName = dirs.pop();

    // Create flat tree, order in array matters
    const flatTree = [
      ...dirs.map(dirName => ({
        name: dirName,
        type: DIRECTORY
      })),
      {
        name: fileName,
        type: FILE
      },
      {
        name: class_name,
        type: CLASS
      },
      {
        name: method_name,
        type: METHOD
      }
    ];

    if (tree === undefined) {
      tree = {
        ...flatTree[0],
        name: flatTree[0].name === '' ? seperator : flatTree[0].name
      };
    }
    flatTree.shift();

    // Insert flatTree to the tree
    let currNodeInTree = tree;
    flatTree.forEach(({ name, type }) => {
      if (currNodeInTree.children === undefined) {
        currNodeInTree.children = [{ name, type }];
        currNodeInTree = currNodeInTree.children[0];
      } else {
        const sameChild = currNodeInTree.children.find(({ name: _name, type: _type }) => (name === _name && type === _type));
        if (sameChild) {
          currNodeInTree = sameChild;
        } else {
          const length = currNodeInTree.children.push({ name, type });
          currNodeInTree = currNodeInTree.children[length - 1];
        }
      }
    });
  });

  return tree;
};
