import React, { Component } from 'react';
import getAppData from 'app/common/get-app-data.js';
import getTreeByAppData from 'app/common/get-tree-by-app-data-promise.js';
import Node from './node.jsx';

const DOWNLOADING = 0;
const PROCESSING = 1;

const getStepString = step => {
  switch (step) {
    case DOWNLOADING:
      return 'Download...';
    case PROCESSING:
      return 'Processing...';
    default: {
      if (__DEV__) {
        throw new Error(`Unknown step - ${step}.`);
      } else {
        return '';
      }
    }
  }
};

export default class Tree extends Component {
  static renderNode(node) {
    const { name, type, children } = node;
    return (
      <Node key={name} name={name} type={type}>
        {
          Array.isArray(children) ?
          children.map(Tree.renderNode) : undefined
        }
      </Node>
    );
  }
  componentWillMount() {
    this.state = {
      step: DOWNLOADING
    };
    getAppData().then(appData => {
      this.setState({
        step: PROCESSING
      }, () => {
        getTreeByAppData(appData).then(tree => {
          this.setState({
            tree
          });
        });
      });
    });
  }
  render() {
    const { step, tree } = this.state;
    return (
      <div>
        {
          !tree &&
          <div>
            { getStepString(step) }
          </div>
        }
        {
          tree &&
          <div>
            { Tree.renderNode(tree) }
          </div>
        }
      </div>
    );
  }
}
