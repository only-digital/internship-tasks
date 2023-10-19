import Component from '../../app/js/base/Component';

class Input extends Component {
  constructor(element) {
    super(element);
    this.inputField = this.getElement('field');
    this.errorMessage = this.getElement('error-message');
    this.successImage = this.getElement('success-image');
    this.pattern = new RegExp(this.inputField.dataset.pattern);

    this.inputField.addEventListener('blur', this._checkInputValidity);
    this.inputField.addEventListener('focus', this._setInputFocused);
  }
  _checkInputValidity = (evt) => {
    const brouserValidation = this.inputField.checkValidity();
    const regexValidation = this.pattern.test(evt.target.value);

    if (!brouserValidation && !regexValidation) {
      this._setErrorMessage(this.inputField.validationMessage);
      this._setIsvalid(false);
    }
    if (brouserValidation && !regexValidation) {
      this._setErrorMessage('Не верный формат email');
      this._setIsvalid(false);
    }
    if (regexValidation) {
      this._setIsvalid(true);
    }
  };
  _setErrorMessage = (message) => {
    this.errorMessage.textContent = message;
  };
  _setIsvalid = (valid) => {
    if (valid) {
      this.inputField.classList.remove('input__field_invalid');
      this.inputField.classList.add('input__field_valid');
    } else {
      this.inputField.classList.remove('input__field_valid');
      this.inputField.classList.add('input__field_invalid');
    }
  };
  _setInputFocused = () => {
    this.inputField.classList.remove('input__field_valid');
    this.inputField.classList.remove('input__field_invalid');
    this._setErrorMessage(' ');
  };
  // Your code here
}

export default Input;
