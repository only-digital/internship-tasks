import Component from '../../app/js/base/Component';

class InputCheckbox extends Component {
  constructor(element) {
    super(element);
    this.checkbox = this.getElement('checkbox');

    this.checkbox.addEventListener('input', this._setIsValid);
  }
  _setIsValid = () => {
    this.checkbox.checked
      ? this.checkbox.setAttribute('data-valid', '')
      : this.checkbox.removeAttribute('data-valid');
  };
  // Your code here
}

export default InputCheckbox;
