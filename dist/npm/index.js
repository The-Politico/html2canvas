'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _CanvasRenderer = require('./renderer/CanvasRenderer');

var _CanvasRenderer2 = _interopRequireDefault(_CanvasRenderer);

var _Logger = require('./Logger');

var _Logger2 = _interopRequireDefault(_Logger);

var _Window = require('./Window');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var html2canvas = function html2canvas(element, conf) {
    if ((typeof console === 'undefined' ? 'undefined' : _typeof(console)) === 'object' && typeof console.log === 'function') {
        console.log('html2canvas ' + __VERSION__);
    }

    var config = conf || {};
    var logger = new _Logger2.default();

    var ownerDocument = element.ownerDocument;
    var defaultView = ownerDocument.defaultView;

    var defaultOptions = {
        async: true,
        allowTaint: false,
        imageTimeout: 15000,
        proxy: null,
        removeContainer: true,
        scale: defaultView.devicePixelRatio || 1,
        target: new _CanvasRenderer2.default(config.canvas),
        type: null,
        windowWidth: defaultView.innerWidth,
        windowHeight: defaultView.innerHeight,
        offsetX: defaultView.pageXOffset,
        offsetY: defaultView.pageYOffset
    };

    var result = (0, _Window.renderElement)(element, _extends({}, defaultOptions, config), logger);

    if (__DEV__) {
        return result.catch(function (e) {
            logger.error(e);
            throw e;
        });
    }
    return result;
};

html2canvas.CanvasRenderer = _CanvasRenderer2.default;

module.exports = html2canvas;