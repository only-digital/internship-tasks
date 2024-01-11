import Component from '../../app/js/base/component';

class Input extends Component {
  inputEmail;
  inputWrapper;
  errorMessage;
  constructor(element) {
    super(element);

    this.invalidEmail = false;
    this.regEmail =
      /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/;
    this.MAX_LENGTH_EMAIL = 255;

    this.inputEmail = document.querySelector('.input__email');
    this.inputWrapper = document.querySelector('.input__wrapper');
    this.errorMessage = document.querySelector('.input__email-error-message');

    this.root.addEventListener('blur', this.validateEmail);
    this.root.addEventListener('input', this.clearError);
  }

  validateEmail = () => {
    const email = this.inputEmail.value;
    if (email.length > this.MAX_LENGTH_EMAIL || !this.regEmail.test(email)) {
      this.invalidEmail = true;
      this.errorMessage.textContent = 'Некорректная почта';
      this.inputWrapper.classList.add('input__wrapper--invalid');
    } else {
      this.invalidEmail = false;
      this.errorMessage.textContent = '';
      this.inputWrapper.classList.remove('input__wrapper--invalid');
      this.inputWrapper.classList.add('input__wrapper--valid');
    }
  };

  clearError = () => {
    if (this.invalidEmail) {
      this.inputWrapper.classList.remove('input__wrapper--invalid');
      this.errorMessage.textContent = '';
    }
  }
}

export default Input;
