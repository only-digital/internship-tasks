import Component from '../../app/js/base/component';

class Feedback extends Component {
  constructor(element) {
    super(element);

    this.form = this.getElement('form');
    this.emailInput = document.querySelector('.input__email');
    this.messageInput = document.querySelector('.textarea');
    this.policyCheckbox = this.getElement('input-policy');
    this.labelElement = this.getElement('policy-label');
    this.linkElement = this.getElement('policy-link');
    this.submitBtn = document.querySelector('button[type="submit"]');
    
    this.policyCheckbox.addEventListener('change', this.updateLabel);
    this.form.addEventListener('change', this.checkInputsValidity);
    
  }

  updateLabel = () => {
    if (this.policyCheckbox.disabled) {
      this.labelElement.style.color = '#bcbcbc';
      this.linkElement.style.color = '#bcbcbc';
    } else {
      this.labelElement.style.color = '';
      this.linkElement.style.color = '';
    }
  }

  checkInputsValidity = () => {
    if (this.emailInput.validity.valid && this.messageInput.validity.valid && this.policyCheckbox.checked) {
      this.submitBtn.disabled = false;
    } else {
      this.submitBtn.disabled = true;
    }
  }
}

export default Feedback;
