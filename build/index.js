(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["surgeonkit"] = factory();
	else
		root["surgeonkit"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _surgeonKit = __webpack_require__(1);

	var _surgeonKit2 = _interopRequireDefault(_surgeonKit);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _surgeonKit2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var tools = {
	  /**
	   *  Converts an Integer to an array of the size populated with index
	   */
	  expand: function expand(size) {
	    if (!Number.isInteger(size) || size <= 0) {
	      throw new Error('tools.expand expects a positive integer (size)');
	    }
	    var arr = [];
	    for (var i = 0; i < size; i++) {
	      arr.push(i);
	    }
	    return arr;
	  },

	  /**
	   *  Dissect an Array at indices
	   */
	  dissect: function dissect(array) {
	    for (var _len = arguments.length, indices = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      indices[_key - 1] = arguments[_key];
	    }

	    if (indices.some(function (index) {
	      return index > array.length || index < 0;
	    })) {
	      throw new Error('tools.dissect expecting indices within rangem of 0 to array.length + 1');
	    }
	    indices.unshift(0);
	    indices.push(array.length);
	    return tools.every(2)(indices, function (index1, index2) {
	      return array.slice(index1, index2);
	    });
	  },

	  /**
	   * @param  {groupsOf} - every this many elements in adjacence
	   * @return {function(arr, callback)}
	   */
	  every: function every(groupsOf) {
	    return function (arr, callback) {
	      var ending = arr.length - groupsOf;
	      var newArr = [];
	      for (var i = 0; i <= ending; i++) {
	        var group = arr.slice(i, i + groupsOf);
	        newArr.push(callback.apply(this, group));
	      }
	      return newArr;
	    };
	  },

	  acceptUntil: function acceptUntil(arr, callback, context) {
	    var flag = true;
	    return arr.filter(function (item) {
	      if (callback.call(context, item)) {
	        flag = false;
	      }
	      return flag;
	    });
	  },

	  // an oversimplified state toggler defined on the Class that calls this routine;
	  // extends to child classes
	  defineState: function defineState(klass, states, stateChangeCallback) {
	    if (!states.length) {
	      throw new Error('need multiple states');
	    } else if (!klass.name) {
	      throw new Error('constructor doesnt have a name');
	    } else if (!klass) {
	      throw new Error('class undefined');
	    }

	    klass.STATES = {};
	    states.forEach(function (stateName) {
	      var capState = stateName[0].toUpperCase() + stateName.slice(1);

	      klass.STATES[stateName] = klass.name + '_STATE__' + stateName;

	      // Define isStateofcompletion();
	      klass.prototype['is' + capState] = function () {
	        return this.state === klass.STATES[stateName];
	      };

	      // define change state
	      klass.prototype[stateName] = function (localCallback) {
	        this.state = klass.STATES[stateName];
	        stateChangeCallback && stateChangeCallback.call(this, stateName);
	        localCallback && localCallback.call(this, stateName);
	      };

	      // initialize state to first of states
	      klass.prototype.state = klass.prototype.state || klass.STATES[stateName];
	    });
	  },

	  cx: function cx(classNames) {
	    var returnClassName = [];
	    for (var className in classNames) {
	      if (classNames[className]) {
	        returnClassName.push(className);
	      }
	    }
	    return returnClassName.join(' ');
	  },

	  zeroPad: function zeroPad(timeNumber) {
	    return ('0' + timeNumber).slice(-2);
	  },

	  manufactureArray: function manufactureArray() {
	    var iframe = document.createElement('iframe');
	    iframe.style.display = 'none';
	    document.body.appendChild(iframe);
	    var ClonedArray = iframe.contentWindow.Array;
	    document.body.removeChild(iframe);
	    return ClonedArray;
	  }

	};

	exports.default = tools;

/***/ }
/******/ ])
});
;