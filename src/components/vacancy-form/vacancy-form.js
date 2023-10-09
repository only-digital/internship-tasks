import Component from '../../app/js/base/component';

const URL = '/form';

class VacancyForm extends Component {
  form;
  input;
  msg;
  confirm;
  success;
  submitBtn;
  loader;

  constructor(element) {
    super(element);
    this.form = this.getElement('form');
    this.input = this.getElement('input');
    this.msg = this.getElement('msg');
    this.success = this.getElement('success');
    this.confirm = this.getElement('checkbox');
    this.submitBtn = this.getElement('btn');
    this.loader = this.getElement('loader');

    this.form.addEventListener('submit', this.submitForm);
  }

  submitForm = (e) => {
    e.preventDefault();

    const email = this.input.value;
    const confirm = this.confirm.checked;

    if (!email) {
      this.msg.textContent = 'Поле E-email обязательно';
      this.msg.classList.add('visible-error');
      this.input.classList.add('input-error');
      return;
    }

    if (email && confirm) {
      this.loader.classList.add('loader-visible');
      this.form.classList.add('success');
      fetch(URL, {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          confirm: confirm,
        }),
        headers: {
          'content-type': 'application/json',
        },
      })
        .then((data) => {
          return new Promise((res) => setTimeout(() => res(data), 5000));
        })
        .then((res) => {
          if (res.status === 422) {
            res.json().then((response) => {
              this.msg.textContent = response.message;
              this.msg.classList.add('visible-error');
              this.input.classList.add('input-error');
              this.form.classList.remove('success');
            });
          } else if (res.status === 200) {
            this.msg.classList.remove('visible-error');
            this.success.classList.add('visible-success');
            this.form.classList.add('success');
          }
          this.loader.classList.remove('loader-visible');
        });
    }
  };
}

export default VacancyForm;
