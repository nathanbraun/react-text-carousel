"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactTypist = require("react-typist");

var _reactTypist2 = _interopRequireDefault(_reactTypist);

var _lodashAssign = require("lodash/assign");

var _lodashAssign2 = _interopRequireDefault(_lodashAssign);

var _lodashGet = require("lodash/get");

var _lodashGet2 = _interopRequireDefault(_lodashGet);

var TextCarousel = (function (_Component) {
  _inherits(TextCarousel, _Component);

  function TextCarousel() {
    var _this = this;

    _classCallCheck(this, TextCarousel);

    _get(Object.getPrototypeOf(TextCarousel.prototype), "constructor", this).apply(this, arguments);

    this.state = {
      currentPhraseIndex: 0
    };

    this.componentDidMount = function () {
      _this.renderWord();
    };

    this.componentWillUnmount = function () {
      clearTimeout(_this.timer);
    };

    this.setNextPhrase = function () {
      var phrases = _this.props.phrases;
      var currentPhraseIndex = _this.state.currentPhraseIndex;

      _this.setState({
        currentPhraseIndex: (currentPhraseIndex + 1) % phrases.length
      });
    };

    this.handleTypingComplete = function () {
      // Need the delay since typist triggers typingComplete before that happens
      var cursorHideDelay = (0, _lodashGet2["default"])(_this.props.typistProps, 'cursor.hideWhenDoneDelay', 0);

      _this.timer = setTimeout(function () {
        _this.renderWord();
      }, _this.props.interval + cursorHideDelay);
    };

    this.getCurrentPhrase = function () {
      return _this.props.phrases[_this.state.currentPhraseIndex];
    };

    this.renderWord = function () {
      var domNode = _this.refs.phraseContainer;
      var typistProps = (0, _lodashAssign2["default"])({}, _this.props.typistProps, {
        onTypingDone: _this.handleTypingComplete
      });

      _reactDom2["default"].unmountComponentAtNode(domNode);
      _reactDom2["default"].render(_react2["default"].createElement(
        _reactTypist2["default"],
        typistProps,
        _this.getCurrentPhrase()
      ), domNode);

      _this.setNextPhrase();
    };

    this.render = function () {
      var customClass = _this.props.className || "";

      return _react2["default"].createElement("span", { className: "textCarouselContainer " + customClass + "}", ref: "phraseContainer" });
    };
  }

  _createClass(TextCarousel, null, [{
    key: "propTypes",
    value: {
      phrases: _react.PropTypes.arrayOf(_react.PropTypes.string).isRequired,
      interval: _react.PropTypes.number,
      typistProps: _react.PropTypes.object
    },
    enumerable: true
  }, {
    key: "defaultProps",
    value: {
      interval: 2000,
      typistProps: {}
    },
    enumerable: true
  }]);

  return TextCarousel;
})(_react.Component);

exports["default"] = TextCarousel;
module.exports = exports["default"];