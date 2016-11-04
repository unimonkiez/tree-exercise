import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Tree from 'app/component/tree.jsx';
import Spinner from 'app/component/spinner.jsx';

export default class App extends Component {
  static childContextTypes = {
    setShowSpinner: PropTypes.func
  };
  getChildContext() {
    return {
      setShowSpinner: this.setShowSpinner
    };
  }
  componentWillMount() {
    this.state = {
      showSpinner: false
    };
  }
  setShowSpinner = this.setShowSpinner.bind(this);
  setShowSpinner(showSpinner) {
    this.setState({
      showSpinner
    });
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Tree />
          {
            this.state.showSpinner &&
            <Spinner />
          }
        </div>
      </MuiThemeProvider>
    );
  }
}
