import Component from "../../app/js/base/Component";

class Form extends Component {
  constructor(element) {
    super(element);

    // Your code here
    this.form = this.root.querySelector("form");
    this.form.addEventListener("submit", this.submitForm);
  }

  // Your code here
  submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      email: formData.get("email"),
      confirm: !!formData.get("confirm"),
    };

    try {
        const response = await fetch('/form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        console.log(e.target);
        console.log(data);

      if (response.ok) {
        document.querySelector(".form__content__container__message").textContent = "Отправлено";
        document.querySelector(".form__content__container__message").classList.add( "green" );
      } else {
        document.querySelector(".form__content__container__message").textContent = "Ошибка";
        document.querySelector(".form__content__container__message").classList.add( "red" );
      }
    } catch (error) {
      console.error("Ошибка получения данных(form)", error);
    }
  };
}

export default Form;