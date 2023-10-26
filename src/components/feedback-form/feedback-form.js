import Component from "../../app/js/base/component";

const URL = "/form";

class FeedbackForm extends Component {
  constructor(element) {
    super(element);

    this.form = this.getElement("form");
    this.email = this.form.querySelector(".input-email__input");
    this.message = this.form.querySelector(".text-area__message");
    this.file = this.form.querySelector(".input-file__input");
    this.accept = this.form.querySelector(".input-checkbox__accept");
    this.button = this.form.querySelector(".button");
    this.status = this.getElement("status");

    this.form.addEventListener("change", this.validation);
    this.form.addEventListener("submit", this.sendForm);
    this.validation();
  }

  validation = () => {
    const isValid =
      this.email.classList.contains("input-email__input_success") &&
      this.message.classList.contains("text-area__message_success") &&
      this.accept.checked;

    if (isValid) {
      this.button.removeAttribute("disabled");
    } else {
      this.button.setAttribute("disabled", "");
    }
  };

  sendForm = async () => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("email", this.email.value);
    formData.append("message", this.message.value);
    for (const file of this.file.files) {
      formData.append("file", file);
    }
    formData.append("accept", this.accept.checked);

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: formData,
      });

      if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
      }

      this.status.textContent = "Информация успешно отправлена!";
      this.status.style.color = "green";

      setTimeout(() => this.resetForm(), 2000);
    } catch (error) {
      this.status.textContent = "Сервер временно недоступен!";
      this.status.style.color = "red";
      console.error("[Fetch Error]:", error.message);
    }
  };

  resetForm = () => {
    this.form.reset();
    this.email.classList.remove("input-email__input_success");
    this.message.classList.remove("text-area__message_success");
    this.accept.removeAttribute("checked");
    this.button.setAttribute("disabled", "");
    this.status.textContent = "";
  };
}

export default FeedbackForm;
