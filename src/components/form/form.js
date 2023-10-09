import Component from '../../app/js/base/component';

class Form extends Component {
  constructor(element) {
    super(element);
    this.inputEmail = this.getElement('input-email');
    this.inputMsg = this.getElement('input-msg');
    this.labelMsg = this.getElement('label-msg');
    this.labelEmail = this.getElement('label-email');

    this.setupLabelAnimation();
  }

  setupLabelAnimation() {
    this.inputEmail.addEventListener('focus', () =>
      this.handleFocus(this.inputEmail, this.labelEmail),
    );
    this.inputEmail.addEventListener('blur', () =>
      this.handleBlur(this.inputEmail, this.labelEmail),
    );

    this.inputMsg.addEventListener('focus', () => this.handleFocus(this.inputMsg, this.labelMsg));
    this.inputMsg.addEventListener('blur', () => this.handleBlur(this.inputMsg, this.labelMsg));
  }

  handleFocus(input, label) {
    input.classList.add('focused-input');
    label.classList.add('focused-label');
  }

  handleBlur(input, label) {
    if (input.value === '') {
      label.classList.remove('focused-label');
      input.classList.remove('focused-input');
    }
  }
}

export default Form;
