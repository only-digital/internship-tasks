import Component from '../../app/js/base/component';

class Feedback extends Component {
  constructor(element) {
    super(element);

    this.form = this.getElement('form');
    this.button = this.getElement('btn');

    this.root.addEventListener('submit', this.handleFormSubmit);
  }

  disabledForm = (form) => {
    const { elements } = form;
    Array.from(elements)
    .forEach((element) => {
      element.disabled = true;
      element.style.opacity = '30%';
      element.value = '';
    })
  }

  serialaizeForm = (formNode) => {
    const { elements } = formNode;
    const data = new FormData();

    Array.from(elements)
      .filter((item) => !!item.name)
      .forEach((element) => {
        const { name, type } = element;
        const value = type === 'checkbox' ? element.checked : element.value;
        data.append(name, value);
      });

    return data;
  };

  handleFormSubmit = async (evt) => {
    evt.preventDefault();
    const data = this.serialaizeForm(this.form);

    const response = await fetch('/form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: data.get('email'), confirm: !!data.get('confirm')}),
    });

    const { status, statusText } = await response;

    if (status === 200) {
      this.button.classList.add('feedback__btn--sent');
      this.disabledForm(this.form);
    } else {
      this.button.classList.add('feedback__btn--error');
    }
  };
}

export default Feedback;
