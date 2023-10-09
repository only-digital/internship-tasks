import Component from "../../app/js/base/Component";

class ContactForm extends Component {
  form;
  emailField;
  errorText;
  submitButton;
  successNotification;
  loader;

  constructor(element) {
    super(element);

    this.form = this.getElement("form");
    this.emailField = this.getElement("email-field");
    this.errorText = this.getElement("error-text");
    this.successNotification = this.getElement("success");
    this.submitButton = this.getElement("submit-button");
    this.loader = this.getElement("loader");

    this.initForm();
  }

  initForm() {
    this.errorText.style.visibility = "hidden";
    this.successNotification.style.display = "none";
    this.loader.style.display = "none";

    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.validateForm();
    });
  }

  showError(message) {
    this.errorText.textContent = message;
    this.errorText.style.visibility = "visible";
    this.submitButton.style.display = "inline-flex";
  }

  showSuccess() {
    this.successNotification.style.display = "flex";
    this.form.classList.add("disabled-form");
  }

  validateForm() {
    if (!this.emailField.value) {
      this.showError("Поле E-mail обязательно");
    } else {
      this.errorText.style.visibility = "hidden";
      this.postDataWithAsyncAwait();
    }
  }

  async postDataWithAsyncAwait() {
    const dataToSend = {
      email: this.emailField.value,
      confirm: true,
    };
    this.submitButton.style.display = "none";
    this.loader.style.display = "inline-block";

    try {
      const response = await fetch("/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      const responseData = await response.json();

      if (response.ok) {
        this.showSuccess();
      } else {
        this.showError(responseData.message);
      }
    } catch (error) {
      console.error("There was a problem with the POST request:", error);
      this.showError("Не удалось выполнить отправку. Попробуйте позже");
      this.errorText.style.color = "black";
    } finally {
      this.loader.style.display = "none";
    }
  }
}

export default ContactForm;
