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

var TextCarousel = (function (_Component) {
  _inherits(TextCarousel, _Component);

  function TextCarousel() {
    var _this = this;

    _classCallCheck(this, TextCarousel);

    _get(Object.getPrototypeOf(TextCarousel.prototype), "constructor", this).apply(this, arguments);

    this.timer = null;
    this.state = {
      currentPhrase: 0
    };

    this.renderWord = function () {
      var domNode = _this.refs.phraseContainer;
      _reactDom2["default"].unmountComponentAtNode(domNode);
      _reactDom2["default"].render(_react2["default"].createElement(
        _reactTypist2["default"],
        _this.props.typistProps,
        _this.getCurrentPhrase()
      ), domNode);
    };

    this.setNextPhrase = function () {
      var nextPhrase = 0;
      if (_this.state.currentPhrase < _this.props.phrases.length - 1) {
        nextPhrase = _this.state.currentPhrase += 1;
      }
      _this.setState({
        currentPhrase: nextPhrase
      });
      _this.renderWord();
    };

    this.componentDidMount = function () {
      _this.renderWord();
      _this.setupTimer();

      document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
          _this.removeTimer();
        } else {
          _this.setupTimer();
        }
      });
    };

    this.setupTimer = function () {
      _this.timer = window.setInterval(function () {
        _this.setNextPhrase();
      }, _this.props.interval);
    };

    this.removeTimer = function () {
      window.clearInterval(_this.timer);
    };

    this.componentWillUnmount = function () {
      _this.removeTimer();
    };

    this.getCurrentPhrase = function () {
      return _this.props.phrases[_this.state.currentPhrase];
    };

    this.render = function () {
      return _react2["default"].createElement("span", { ref: "phraseContainer" });
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
      interval: 3000,
      typistProps: {}
    },
    enumerable: true
  }]);

  return TextCarousel;
})(_react.Component);

exports["default"] = TextCarousel;
module.exports = exports["default"];