const KIND = {
  CLASS: 'class',
  INSTANCE: 'instance',
  OBJECT: 'ObjCImplementationDecl'
};

export default appData => {
  const kind = {};
  const getTreeByChildren = children => {
    children.forEach(child => {
      const keys = Object.keys(child).reduce((obj, k) => ({ ...obj, [k]: child[k] }), {});
      kind[child.kind] = {
        ...kind[child.kind],
        ...keys
      };
      if (child.children) {
        getTreeByChildren(child.children);
      }
    });
    return {};
  };
  const tree = getTreeByChildren(appData.methods);
  console.log(kind);
  return tree;
};
