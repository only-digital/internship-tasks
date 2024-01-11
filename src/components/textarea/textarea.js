import Component from '../../app/js/base/component';

class Textarea extends Component {
  inputText;
  textareaWrapper;
  errorMessage;
  constructor(element) {
    super(element);

    this.invalidTextInput = false;
    this.MAX_LENGTH_TEXT = 1000;

    this.inputText = document.querySelector('.textarea');
    this.textareaWrapper = document.querySelector('.textarea__wrapper');
    this.errorMessage = document.querySelector('.textarea-error-message');

    this.root.addEventListener('blur', this.validateTextInput);
    this.root.addEventListener('input', this.clearError);
  }

  validateTextInput = () => {
    const text = this.inputText.value;
    if (text.length > this.MAX_LENGTH_TEXT) {
      this.invalidTextInput = true;
      this.errorMessage.textContent = `Поле должно содержать не более ${
        this.MAX_LENGTH_TEXT
      } символов, превышено на ${text.length - this.MAX_LENGTH_TEXT}`;
      this.textareaWrapper.classList.add('textarea__wrapper--invalid');
    }
    if (text.length === 0) {
      this.invalidTextInput = true;
      this.errorMessage.textContent = `Поле не может быть пустым`;
      this.textareaWrapper.classList.add('textarea__wrapper--invalid');
    } else {
      this.invalidTextInput = false;
      this.errorMessage.textContent = '';
      this.textareaWrapper.classList.remove('textarea__wrapper--invalid');
      this.textareaWrapper.classList.add('textarea__wrapper--valid');
    }
  };

  clearError = () => {
    if (this.invalidTextInput) {
      this.textareaWrapper.classList.remove('textarea__wrapper--invalid');
      this.errorMessage.textContent = '';
    }
  };
}

export default Textarea;
