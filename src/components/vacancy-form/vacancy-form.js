import Component from '../../app/js/base/component';

class VacancyForm extends Component {
  URL;
  form;
  input;
  msg;
  confirm;
  success;
  submitBtn;

  constructor(element) {
    super(element);
    this.URL = '/form';
    this.form = this.getElement('form');
    this.input = this.getElement('input');
    this.msg = this.getElement('msg');
    this.success = this.getElement('success');
    console.log(this.success);
    this.confirm = this.getElement('checkbox');
    this.submitBtn = this.getElement('btn');

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
      fetch(this.URL, {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          confirm: confirm,
        }),
        headers: {
          'content-type': 'application/json',
        },
      }).then((res) => {
        if (res.status === 422) {
          res.json().then((response) => {
            this.msg.textContent = response.message;
            this.msg.classList.add('visible-error');
            this.input.classList.add('input-error');
          });
        } else if (res.status === 200) {
          this.msg.classList.remove('visible-error');
          this.success.classList.add('visible-success');
        }
      });
    }
  };
}

export default VacancyForm;
