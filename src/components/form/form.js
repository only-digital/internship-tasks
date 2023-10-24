import Component from '../../app/js/base/Component';

class Form extends Component {
  constructor(element) {
    super(element);
    this.fileinput = this.getElement('file-input');
    this.fileinput.addEventListener('change', this._setFormData);

    // Your code here
  }
  _setFormData = () => {
    console.log(this.fileinput.formData);
    // if (this.fileinput.getAttibute('valid')) {
    //   console.log('ok');
    // }
  };

  // Your code here
}

export default Form;
