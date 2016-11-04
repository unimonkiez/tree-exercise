import React, { Component } from 'react';
import getAppData from 'app/common/get-app-data.js';
import getTreeByAppData from 'app/common/get-tree-by-app-data.js';

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

export default class Header extends Component {
  componentWillMount() {
    this.state = {
      step: DOWNLOADING
    };
    getAppData().then(appData => {
      this.setState({
        step: PROCESSING
      }, () => {
        // Executing this `setState` in the callback of the other `setState` because `getTreeByAppData` takes time to execute
        this.setState({
          tree: getTreeByAppData(appData)
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
      </div>
    );
  }
}
