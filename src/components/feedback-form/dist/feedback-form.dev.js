"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _component = _interopRequireDefault(require("../../app/js/base/component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var FeedbackForm =
/*#__PURE__*/
function (_Component) {
  _inherits(FeedbackForm, _Component);

  function FeedbackForm(element) {
    var _this;

    _classCallCheck(this, FeedbackForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FeedbackForm).call(this, element));
    _this.emailInputElement = _this.getElement('content__email__input');
    _this.checkboxInputElement = _this.getElement('content__checkbox__input');
    _this.messageElement = _this.getElement('content__message');
    _this.loaderElement = _this.getElement('content__loader');
    _this.submitElement = _this.getElement('content__submit');
    _this.emailElement = _this.getElement('content__email');
    _this.confirmElement = _this.getElement('content__confirm');

    _this.root.addEventListener('submit', _this.onSubmit);

    return _this;
  } // onSubmit = async (event) => {
  //   event.preventDefault()
  //   const url = 'http://localhost:3000/form'
  //   let data = {
  //     email: this.emailInputElement.value,
  //     confirm: this.checkboxInputElement.checked,
  //   }
  //   this.toggleLoader()
  //   try {
  //     let response = await this.sendData(url, data)
  //   } catch (error) {
  //     console.error(error)
  //   } finally {
  //     this.toggleLoader()
  //   }
  // }
  // async sendData(url, data) {
  //   try {
  //     const response = await fetch(url, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json;charset=utf-8',
  //       },
  //       body: JSON.stringify(data),
  //     })
  //     return await response
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
  // toggleLoader() {
  //   this.loaderElement.classList.toggle('loader')
  // }


  return FeedbackForm;
}(_component["default"]);

var _default = FeedbackForm;
exports["default"] = _default;
//# sourceMappingURL=feedback-form.dev.js.map
