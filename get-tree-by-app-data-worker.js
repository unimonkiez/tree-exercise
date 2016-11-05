/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _getTreeByAppData = __webpack_require__(659);
	
	var _getTreeByAppData2 = _interopRequireDefault(_getTreeByAppData);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	self.onmessage = function (e) {
	  var args = e.data.args;
	
	  self.postMessage(_getTreeByAppData2.default.apply(undefined, _toConsumableArray(args)));
	};

/***/ },

/***/ 626:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var DIRECTORY = exports.DIRECTORY = 0;
	var FILE = exports.FILE = 1;
	var CLASS = exports.CLASS = 2;
	var METHOD = exports.METHOD = 4;

/***/ },

/***/ 659:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _nodeType = __webpack_require__(626);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var seperator = '/';
	
	exports.default = function (appData) {
	  var tree = void 0;
	
	  appData.methods.forEach(function (_ref) {
	    var file = _ref.file,
	        class_name = _ref.class_name,
	        method_name = _ref.method_name;
	
	    var dirs = file.split(seperator);
	    var fileName = dirs.pop();
	
	    // Create flat tree, order in array matters
	    var flatTree = [].concat(_toConsumableArray(dirs.map(function (dirName) {
	      return {
	        name: dirName,
	        type: _nodeType.DIRECTORY
	      };
	    })), [{
	      name: fileName,
	      type: _nodeType.FILE
	    }, {
	      name: class_name,
	      type: _nodeType.CLASS
	    }, {
	      name: method_name,
	      type: _nodeType.METHOD
	    }]);
	
	    if (tree === undefined) {
	      tree = _extends({}, flatTree[0], {
	        name: flatTree[0].name === '' ? seperator : flatTree[0].name
	      });
	    }
	    flatTree.shift();
	
	    // Insert flatTree to the tree
	    var currNodeInTree = tree;
	    flatTree.forEach(function (_ref2) {
	      var name = _ref2.name,
	          type = _ref2.type;
	
	      if (currNodeInTree.children === undefined) {
	        currNodeInTree.children = [{ name: name, type: type }];
	        currNodeInTree = currNodeInTree.children[0];
	      } else {
	        var sameChild = currNodeInTree.children.find(function (_ref3) {
	          var _name = _ref3.name,
	              _type = _ref3.type;
	          return name === _name && type === _type;
	        });
	        if (sameChild) {
	          currNodeInTree = sameChild;
	        } else {
	          var length = currNodeInTree.children.push({ name: name, type: type });
	          currNodeInTree = currNodeInTree.children[length - 1];
	        }
	      }
	    });
	  });
	
	  return tree;
	};

/***/ }

/******/ });
//# sourceMappingURL=get-tree-by-app-data-worker.js.map