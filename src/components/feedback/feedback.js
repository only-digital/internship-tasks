import Component from '../../app/js/base/component';

class Feedback extends Component {
  constructor(element) {
    super(element);

    this.form = this.getElement('form');

    this.root.addEventListener('submit', this.handleFormSubmit);
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
      body: { email: data.get('email'), confirm: !!data.get('confirm') },
    });
  };
}

export default Feedback;
