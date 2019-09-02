/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/dist/cjs.js!./src/components/main/main.scss":
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/sass-loader/dist/cjs.js!./src/components/main/main.scss ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \".main-container::after {\\n  content: \\\"\\\";\\n  display: block;\\n  clear: both;\\n}\\n.main-container > .sidebar {\\n  float: left;\\n  width: 200px;\\n  height: 100vh;\\n  background: #99f;\\n}\\n.main-container > .main {\\n  float: left;\\n  width: -webkit-calc(100vw - 200px);\\n  width: -moz-calc(100vw - 200px);\\n  width: calc(100vw - 200px);\\n  height: 100vh;\\n  background: #9f9;\\n}\", \"\"]);\n\n\n//# sourceURL=webpack:///./src/components/main/main.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/dist/cjs.js!./src/components/sidebar/sidebar.scss":
/*!************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/sass-loader/dist/cjs.js!./src/components/sidebar/sidebar.scss ***!
  \************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \".sidebar-container .item {\\n  padding: 0 20px;\\n  line-height: 30px;\\n  -webkit-box-sizing: border-box;\\n     -moz-box-sizing: border-box;\\n          box-sizing: border-box;\\n  cursor: pointer;\\n}\\n.sidebar-container .item:hover {\\n  background: #9f9;\\n}\", \"\"]);\n\n\n//# sourceURL=webpack:///./src/components/sidebar/sidebar.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js!./src/css/common.css":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--7-1!./node_modules/postcss-loader/src!./src/css/common.css ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"* {\\r\\n\\tmargin: 0;\\r\\n\\tpadding: 0;\\r\\n}\\r\\nbody, html {\\r\\n\\tfont-size: 14px;\\r\\n\\tbackground: #9ff;\\r\\n}\\r\\nul, li {\\r\\n\\tlist-style: none;\\r\\n}\\r\\n.flex-div {\\r\\n\\tdisplay: -webkit-box;\\r\\n\\tdisplay: -webkit-flex;\\r\\n\\tdisplay: -moz-box;\\r\\n\\tdisplay: -ms-flexbox;\\r\\n\\tdisplay: flex;\\r\\n}\\r\\n\\r\\n\", \"\"]);\n\n\n//# sourceURL=webpack:///./src/css/common.css?./node_modules/css-loader/dist/cjs.js??ref--7-1!./node_modules/postcss-loader/src");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \"{\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    for (var i = 0; i < this.length; i++) {\n      // eslint-disable-next-line prefer-destructuring\n      var id = this[i][0];\n\n      if (id != null) {\n        alreadyImportedModules[id] = true;\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = modules[_i]; // skip already imported module\n      // this implementation is not 100% perfect for weird media query combinations\n      // when a module is imported multiple times with different media queries.\n      // I hope this will never occur (Hey this way we have smaller bundles)\n\n      if (item[0] == null || !alreadyImportedModules[item[0]]) {\n        if (mediaQuery && !item[2]) {\n          item[2] = mediaQuery;\n        } else if (mediaQuery) {\n          item[2] = \"(\".concat(item[2], \") and (\").concat(mediaQuery, \")\");\n        }\n\n        list.push(item);\n      }\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring\n\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return \"/*# sourceURL=\".concat(cssMapping.sourceRoot).concat(source, \" */\");\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = \"sourceMappingURL=data:application/json;charset=utf-8;base64,\".concat(base64);\n  return \"/*# \".concat(data, \" */\");\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar stylesInDom = {};\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nfunction listToStyles(list, options) {\n  var styles = [];\n  var newStyles = {};\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var css = item[1];\n    var media = item[2];\n    var sourceMap = item[3];\n    var part = {\n      css: css,\n      media: media,\n      sourceMap: sourceMap\n    };\n\n    if (!newStyles[id]) {\n      styles.push(newStyles[id] = {\n        id: id,\n        parts: [part]\n      });\n    } else {\n      newStyles[id].parts.push(part);\n    }\n  }\n\n  return styles;\n}\n\nfunction addStylesToDom(styles, options) {\n  for (var i = 0; i < styles.length; i++) {\n    var item = styles[i];\n    var domStyle = stylesInDom[item.id];\n    var j = 0;\n\n    if (domStyle) {\n      domStyle.refs++;\n\n      for (; j < domStyle.parts.length; j++) {\n        domStyle.parts[j](item.parts[j]);\n      }\n\n      for (; j < item.parts.length; j++) {\n        domStyle.parts.push(addStyle(item.parts[j], options));\n      }\n    } else {\n      var parts = [];\n\n      for (; j < item.parts.length; j++) {\n        parts.push(addStyle(item.parts[j], options));\n      }\n\n      stylesInDom[item.id] = {\n        id: item.id,\n        refs: 1,\n        parts: parts\n      };\n    }\n  }\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n\n  if (typeof options.attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : undefined;\n\n    if (nonce) {\n      options.attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(options.attributes).forEach(function (key) {\n    style.setAttribute(key, options.attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  }\n\n  if (sourceMap && btoa) {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  options.attributes = typeof options.attributes === 'object' ? options.attributes : {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  var styles = listToStyles(list, options);\n  addStylesToDom(styles, options);\n  return function update(newList) {\n    var mayRemove = [];\n\n    for (var i = 0; i < styles.length; i++) {\n      var item = styles[i];\n      var domStyle = stylesInDom[item.id];\n\n      if (domStyle) {\n        domStyle.refs--;\n        mayRemove.push(domStyle);\n      }\n    }\n\n    if (newList) {\n      var newStyles = listToStyles(newList, options);\n      addStylesToDom(newStyles, options);\n    }\n\n    for (var _i = 0; _i < mayRemove.length; _i++) {\n      var _domStyle = mayRemove[_i];\n\n      if (_domStyle.refs === 0) {\n        for (var j = 0; j < _domStyle.parts.length; j++) {\n          _domStyle.parts[j]();\n        }\n\n        delete stylesInDom[_domStyle.id];\n      }\n    }\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_common_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/common.css */ \"./src/css/common.css\");\n/* harmony import */ var _css_common_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_common_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_main_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/main/main.js */ \"./src/components/main/main.js\");\n\n\n\nvar App = function App() {\n  var app = document.getElementById('app');\n  app.innerHTML = _components_main_main_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].tpl;\n  _components_main_main_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init();\n};\n\nApp();\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/components/index/index.html":
/*!*****************************************!*\
  !*** ./src/components/index/index.html ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div>大家好，我是index</div>\";\n\n//# sourceURL=webpack:///./src/components/index/index.html?");

/***/ }),

/***/ "./src/components/index/index.js":
/*!***************************************!*\
  !*** ./src/components/index/index.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.html */ \"./src/components/index/index.html\");\n/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_html__WEBPACK_IMPORTED_MODULE_0__);\n\nvar index = {\n  name: \"index\",\n  tpl: _index_html__WEBPACK_IMPORTED_MODULE_0___default.a\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (index);\n\n//# sourceURL=webpack:///./src/components/index/index.js?");

/***/ }),

/***/ "./src/components/main/main.html":
/*!***************************************!*\
  !*** ./src/components/main/main.html ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"main-container\\\" id=\\\"main-container\\\">\\r\\n\\t<div class=\\\"sidebar\\\"></div>\\r\\n\\t<div class=\\\"main\\\"></div>\\r\\n</div>\";\n\n//# sourceURL=webpack:///./src/components/main/main.html?");

/***/ }),

/***/ "./src/components/main/main.js":
/*!*************************************!*\
  !*** ./src/components/main/main.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _main_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.html */ \"./src/components/main/main.html\");\n/* harmony import */ var _main_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_main_html__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.scss */ \"./src/components/main/main.scss\");\n/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_main_scss__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _sidebar_sidebar_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sidebar/sidebar.js */ \"./src/components/sidebar/sidebar.js\");\n/* harmony import */ var _index_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../index/index.js */ \"./src/components/index/index.js\");\n/* harmony import */ var _record_record_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../record/record.js */ \"./src/components/record/record.js\");\n\n\n\n\n\nvar main = {\n  name: \"main\",\n  tpl: _main_html__WEBPACK_IMPORTED_MODULE_0___default.a,\n  routes: {},\n  init: function init() {\n    var _this = this;\n\n    this.routes = {\n      index: _index_index_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n      record: _record_record_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\n    };\n    this.oSidebar = document.querySelector('.main-container > .sidebar');\n    this.oMain = document.querySelector('.main-container > .main');\n    this.oSidebar.innerHTML = _sidebar_sidebar_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].tpl();\n    _sidebar_sidebar_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].init(function (route) {\n      _this.setMain(route);\n    });\n    this.setMain('index');\n  },\n  setMain: function setMain(route) {\n    if (route in this.routes) {\n      this.oMain.innerHTML = this.routes[route].tpl;\n    }\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (main);\n\n//# sourceURL=webpack:///./src/components/main/main.js?");

/***/ }),

/***/ "./src/components/main/main.scss":
/*!***************************************!*\
  !*** ./src/components/main/main.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/postcss-loader/src!../../../node_modules/sass-loader/dist/cjs.js!./main.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/dist/cjs.js!./src/components/main/main.scss\");\n\nif (typeof content === 'string') {\n  content = [[module.i, content, '']];\n}\n\nvar options = {}\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\")(content, options);\n\nif (content.locals) {\n  module.exports = content.locals;\n}\n\n\n//# sourceURL=webpack:///./src/components/main/main.scss?");

/***/ }),

/***/ "./src/components/record/record.html":
/*!*******************************************!*\
  !*** ./src/components/record/record.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div>我是record</div>\";\n\n//# sourceURL=webpack:///./src/components/record/record.html?");

/***/ }),

/***/ "./src/components/record/record.js":
/*!*****************************************!*\
  !*** ./src/components/record/record.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _record_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./record.html */ \"./src/components/record/record.html\");\n/* harmony import */ var _record_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_record_html__WEBPACK_IMPORTED_MODULE_0__);\n\nvar record = {\n  name: \"record\",\n  tpl: _record_html__WEBPACK_IMPORTED_MODULE_0___default.a\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (record);\n\n//# sourceURL=webpack:///./src/components/record/record.js?");

/***/ }),

/***/ "./src/components/sidebar/sidebar.ejs":
/*!********************************************!*\
  !*** ./src/components/sidebar/sidebar.ejs ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(obj) {\nobj || (obj = {});\nvar __t, __p = '', __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\nwith (obj) {\n__p += '<div class=\"sidebar-container\">\\r\\n\t';\n for (var i = 0; i < list.length; i++) { ;\n__p += '\\r\\n\t\t<div class=\"item\" data-route=\"' +\n((__t = ( list[i].route )) == null ? '' : __t) +\n'\">' +\n((__t = ( list[i].name )) == null ? '' : __t) +\n'</div>\\r\\n\t';\n } ;\n__p += '\\r\\n</div>';\n\n}\nreturn __p\n}\n\n//# sourceURL=webpack:///./src/components/sidebar/sidebar.ejs?");

/***/ }),

/***/ "./src/components/sidebar/sidebar.js":
/*!*******************************************!*\
  !*** ./src/components/sidebar/sidebar.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sidebar_ejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sidebar.ejs */ \"./src/components/sidebar/sidebar.ejs\");\n/* harmony import */ var _sidebar_ejs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sidebar_ejs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _sidebar_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sidebar.scss */ \"./src/components/sidebar/sidebar.scss\");\n/* harmony import */ var _sidebar_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_sidebar_scss__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar list = [{\n  name: '首页',\n  route: 'index'\n}, {\n  name: '报表',\n  route: 'record'\n}];\nvar sidebar = {\n  name: \"sidebar\",\n  tpl: function tpl(data) {\n    if (data) {\n      list = data;\n    }\n\n    return _sidebar_ejs__WEBPACK_IMPORTED_MODULE_0___default()({\n      list: list\n    });\n  },\n  init: function init(setMain) {\n    this.setMain = setMain;\n    this.initState();\n    this.initEvent();\n  },\n  initState: function initState() {\n    this.oItem = document.querySelectorAll('.sidebar-container .item');\n  },\n  initEvent: function initEvent() {\n    var _this = this;\n\n    for (var i = 0; i < this.oItem.length; i++) {\n      this.oItem[i].onclick = function () {\n        var route = this.getAttribute('data-route');\n\n        _this.setMain(route);\n      };\n    }\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (sidebar);\n\n//# sourceURL=webpack:///./src/components/sidebar/sidebar.js?");

/***/ }),

/***/ "./src/components/sidebar/sidebar.scss":
/*!*********************************************!*\
  !*** ./src/components/sidebar/sidebar.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/postcss-loader/src!../../../node_modules/sass-loader/dist/cjs.js!./sidebar.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/dist/cjs.js!./src/components/sidebar/sidebar.scss\");\n\nif (typeof content === 'string') {\n  content = [[module.i, content, '']];\n}\n\nvar options = {}\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\")(content, options);\n\nif (content.locals) {\n  module.exports = content.locals;\n}\n\n\n//# sourceURL=webpack:///./src/components/sidebar/sidebar.scss?");

/***/ }),

/***/ "./src/css/common.css":
/*!****************************!*\
  !*** ./src/css/common.css ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--7-1!../../node_modules/postcss-loader/src!./common.css */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js!./src/css/common.css\");\n\nif (typeof content === 'string') {\n  content = [[module.i, content, '']];\n}\n\nvar options = {}\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\")(content, options);\n\nif (content.locals) {\n  module.exports = content.locals;\n}\n\n\n//# sourceURL=webpack:///./src/css/common.css?");

/***/ })

/******/ });