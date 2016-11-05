import React, { Component, PropTypes } from 'react';
import * as nodeType from 'app/constant/node-type.js';
import ClassIcon from 'material-ui/svg-icons/action/class';
import FileIcon from 'material-ui/svg-icons/editor/insert-drive-file';
import FolderIcon from 'material-ui/svg-icons/file/folder-open';
import MethodIcon from 'material-ui/svg-icons/notification/adb';
import OpenIcon from 'material-ui/svg-icons/navigation/chevron-right';
import CloseIcon from 'material-ui/svg-icons/navigation/chevron-left';

const { DIRECTORY, FILE, CLASS, METHOD } = nodeType;

export default class Node extends Component {
  static renderIcon(type) {
    switch (type) {
      case DIRECTORY:
        return (<FolderIcon />);
      case FILE:
        return (<FileIcon />);
      case CLASS:
        return (<ClassIcon />);
      case METHOD:
        return (<MethodIcon />);
      default: {
        if (__DEV__) {
          throw new Error(`Unknown type - ${type}.`);
        } else {
          return '';
        }
      }
    }
  }
  state = {
    open: false
  };
  toggleOpen() {
    const { open } = this.state;
    this.setState({
      open: !open
    });
  }
  toggleOpen = this.toggleOpen.bind(this);
  render() {
    const { type, name, children } = this.props;
    const { open } = this.state;

    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <div style={{ width: '40px', flex: '0 0 40px' }}>
            { Node.renderIcon(type) }
          </div>
          <div>
            { name }
          </div>
        </div>
        <div onClick={this.toggleOpen}>
          { children && (open ? <CloseIcon /> : <OpenIcon />) }
        </div>
        <div style={{ paddingLeft: '15px' }}>
          {
            open && children
          }
        </div>
      </div>
    );
  }
}
if (__DEV__) {
  Node.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node),
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.keys(nodeType).map(k => nodeType[k])).isRequired
  };
}
