import Component from "../../app/js/base/Component";

class Feedback extends Component {
  feedBackForm;
  submitButton;
  emailError;
  formResponse;

  constructor(element) {
    super(element);

    this.feedBackForm = this.getElement("form");
    this.submitButton = this.getElement("form-button");
    this.emailError = this.feedBackForm.querySelector(".input-text__error");
    this.formResponse = this.feedBackForm.querySelector(".form-response__text");

    this.submitButton.addEventListener("click", this.sendForm);
  }

  sendForm = async (e) => {
    e.preventDefault();
    const emailValue = document.getElementById("email").value;
    const isConfirm = document.getElementById("confirm").checked;

    this.showEmailValidity(emailValue);

    let response = await fetch("/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: emailValue,
        confirm: isConfirm,
      }),
    });

    if (response.status === 200) {
      this.formResponse.style.color = "green";
    } else if (response.status === 422) {
      this.formResponse.style.color = "red";
    }

    let result = await response.json();

    this.feedBackForm.classList.add("sent");
    this.formResponse.textContent = result.message;
  };

  showEmailValidity = (value) => {
    if (!value.length) {
      this.emailError.textContent = "Поле E-mail обязательно";
    }
    if (value.length < 6 && !value.includes("@") && !value.includes(".")) {
      this.emailError.textContent = "Введите корректный Email";
    }
    this.emailError.textContent = "";
  };
}

export default Feedback;
