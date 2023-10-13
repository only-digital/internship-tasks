import Component from '../../app/js/base/Component';

class VacancyForm extends Component {
  formElement;
  input;
  checkbox;
  errMessage;
  successMessage;
  submitBtn;
  loader;

  constructor(element) {
    super(element);
    this.formElement = this.getElement('form');
    this.input = this.getElement('input');
    this.checkbox = this.getElement('checkbox');
    this.errMessage = this.getElement('err-message');
    this.successMessage = this.getElement('success-message');
    this.submitBtn = this.getElement('submit-btn');
    this.loader = this.formElement.querySelector('.form-loader');

    this.formElement.addEventListener('submit', this.handleSubmit);
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    this.disableForm();
    this.toggleLoader();

    try {
      const res = await fetch('/form', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email: this.input.value,
          confirm: this.checkbox.checked,
        }),
      });

      this.handleResponse(res);
    } catch (err) {
      console.error('Ошибка:', err);
    } finally {
      this.toggleLoader();
    }
  };

  toggleLoader = () => {
    this.loader.classList.toggle('active');
  };

  disableForm = () => {
    this.errMessage.textContent = '';
    this.formElement.classList.add('inactive');
    this.input.setAttribute('disabled', true);
    this.checkbox.setAttribute('disabled', true);
  };

  enableForm = () => {
    this.errMessage.textContent = '';
    this.formElement.classList.remove('inactive');
    this.input.removeAttribute('disabled');
    this.checkbox.removeAttribute('disabled');
  };

  handleResponse = async (res) => {
    const data = await res.json();

    if (res.status === 200) {
      this.successMessage.classList.add('active');
    } else {
      this.enableForm();
      this.errMessage.textContent = data.message;
    }
  };
}

export default VacancyForm;
