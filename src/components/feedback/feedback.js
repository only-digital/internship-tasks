import Component from "../../app/js/base/component";

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

    let result = await response.json();

    if (response.status === 200) {
      this.feedBackForm.classList.add("sent");
      this.emailError.textContent = "";
      this.formResponse.textContent = result.message;
    } else if (response.status === 422) {
      this.emailError.textContent = result.message;
    }
  };
}

export default Feedback;
