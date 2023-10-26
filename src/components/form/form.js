import Component from '../../app/js/base/Component';

class Form extends Component {
  constructor(element) {
    super(element);
    this.sendFields = this.root.dataset.sendInputs.split(',');
    this.submit = this.getElement('input-submit');
    this.submit.setAttribute('disabled', '');
    this.inputs = this.getElements('item');
    this.requiredInputs = this.inputs.filter((input) =>
      input.hasAttribute('required')
    );
    this.requiredInputs.forEach((input) => {
      const observer = new MutationObserver(this._setIsVaidForm);
      observer.observe(input, { attributes: true });
    });
    this.root.addEventListener('submit', this._sendData);
  }

  _setIsVaidForm = () => {
    const isFormValid = this.requiredInputs
      .map((element) => element.hasAttribute('data-valid'))
      .every((item) => item === true);
    if (!isFormValid) {
      this.submit.setAttribute('disabled', '');
    } else {
      this.submit.removeAttribute('disabled');
    }
  };
  _sendData = (evt) => {
    this.submit.setAttribute('disabled', '');
    evt.preventDefault();
    // const sendData = new FormData();
    // this.sendFields.forEach((field) => {
    //   if (field !== 'files') {
    //     sendData[field] = this.root.querySelector(`#${field}`).value;
    //   } else {
    //     sendData[field] = this.root.querySelector(`#${field}`)[field];
    //   }
    // });
    const sendData = this._createFormData();
    console.log(sendData);
    fetch('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: sendData,
    })
      .then((res) => {
        if (res.ok) {
          console.log(res.status);
          this._disableForm();
        } else {
          console.log('bad');
          return Promise.reject(res.status);
        }
      })
      .catch((err) => console.log(err));
  };
  _createFormData = () => {
    const sendData = new FormData();
    this.sendFields.forEach((field) => {
      if (field !== 'files') {
        sendData[field] = this.root.querySelector(`#${field}`).value;
      } else {
        sendData[field] = this.root.querySelector(`#${field}`)[field];
      }
    });
    return sendData;
  };

  _disableForm = () => {
    this.inputs.forEach((item) => {
      item.setAttribute('disabled', '');
      item.removeAttribute('data-valid');
    });
  };
}

export default Form;
