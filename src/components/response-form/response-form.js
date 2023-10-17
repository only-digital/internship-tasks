import Component from '../../app/js/base/Component';

class ResponseForm extends Component {
  constructor(element) {
    super(element);
    this.form = this.getElement('form');
    this.errorMessage = this.getElement('error-message');
    this.emailInput = this.getElement('input');
    this.checkbox = this.getElement('checkbox');
    this.submit = this.getElement('submit');
    this.successMessage = this.getElement('success-message');
    this.responseData = {};

    this.emailInput.addEventListener('keyup', (evt) => {
      this.responseData[evt.target.name] = evt.target.value;
      this.checkFormValidity();
      if (!this.emailInput.validity.valid) {
        this.errorMessage.textContent = this.emailInput.validationMessage;
      } else {
        this.errorMessage.textContent = ' ';
      }
    });

    this.checkbox.addEventListener('change', (evt) => {
      this.responseData[evt.target.name] = evt.target.checked;
      this.checkFormValidity();
    });

    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.sendResponse();
    });
  }

  sendResponse = () => {
    console.log(JSON.stringify(this.responseData));
    fetch('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.responseData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res);
        }
      })
      .then((response) => {
        this.setMesasge(response.message);
        this.setFormDisabled();
      })
      .catch((err) => {
        console.log(err);
        // err.json().then((err) => this.setMesasge(err.message));
      });
  };

  checkFormValidity = () => {
    console.log(!this.submit.hasAttribute('disabled'));
    if (this.form.checkValidity()) {
      this.submit.removeAttribute('disabled');
    } else {
      this.submit.setAttribute('disabled', '');
    }
  };

  setMesasge = (message) => {
    this.errorMessage.textContent = message;
  };
  setFormDisabled = () => {
    this.form.setAttribute('disabled', '');
    this.checkbox.setAttribute('disabled', '');
    this.emailInput.setAttribute('disabled', '');
    this.submit.setAttribute('disabled', '');
    this.submit.classList.add('response-form__submit_success');
    this.successMessage.classList.add('response-form__success-message_visible');
  };
}

export default ResponseForm;
