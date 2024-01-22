import Component from '../../app/js/base/component';

class Feedback extends Component {
  constructor(element) {
    super(element);

    this.form = this.getElement('form');
    this.emailInput = this.getElement('input-email');
    this.messageInput = this.getElement('textarea');
    this.policyCheckbox = this.getElement('input-policy');
    this.labelElement = this.getElement('policy-label');
    this.submitBtn = this.getElement('button-submit');
    this.inputWrapper = document.querySelector('.input__wrapper');
    this.textWrapper = document.querySelector('.textarea__wrapper');

    this.policyCheckbox.addEventListener('change', this.updateLabel);
    this.form.addEventListener('change', this.checkInputsValidity);

    this.root.addEventListener('submit', this.handleFormSubmit);
    
  }

  updateLabel = () => {
    if (this.policyCheckbox.disabled) {
      this.labelElement.classList.add('feedback__policy-label--disabled');
    } else {
      this.labelElement.classList.remove('feedback__policy-label--disabled');
    }
  }

  checkInputsValidity = () => {
    if (this.emailInput.validity.valid && this.messageInput.validity.valid && this.policyCheckbox.checked) {
      this.submitBtn.disabled = false;
    } else {
      this.submitBtn.disabled = true;
    }
  }

  handleFormSubmit = async (evt) => {
    evt.preventDefault();
    const data = new FormData(this.form);

    const response = await fetch('/form', {
      method: 'POST',
      body: data,
    });

    const { status, statusText } = await response;
    if (status === 200) {
      this.form.reset();
      this.submitBtn.disabled = true;
      this.inputWrapper.classList.remove('input__wrapper--valid');
      this.textWrapper.classList.remove('textarea__wrapper--valid');
    } else {
      console.error(statusText);
    }
  }
}

export default Feedback;
