import Component from '../../app/js/base/component';

class Feedback extends Component {
  constructor(element) {
    super(element);

    this.inputElement = this.getElement('input-policy');
    this.labelElement = this.getElement('policy-label');
    this.linkElement = this.getElement('policy-link');
    this.updateLabel();
    this.inputElement.addEventListener('change', () => this.updateLabel());
  }

  updateLabel() {
    if (this.inputElement.disabled) {
      this.labelElement.style.color = '#bcbcbc';
      this.linkElement.style.color = '#bcbcbc';
    } else {
      this.labelElement.style.color = '';
      this.linkElement.style.color = '';
    }
  }
}

export default Feedback;
