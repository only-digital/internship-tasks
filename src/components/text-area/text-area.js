import Component from "../../app/js/base/component";

class TextArea extends Component {
  constructor(element) {
    super(element);

    this.message = this.getElement("message");
    this.error = this.getElement("error");

    this.message.addEventListener("change", this.validation);
    this.message.addEventListener("input", this.clear);
  }

  validation = () => {
    const value = event.target.value;

    if (!this.isValidLength(value)) {
      this.showError(
        true,
        "Сообщение не может быть пустым или содержать более 1000 символов!"
      );
      return;
    }

    this.message.classList.add("text-area__message_success");
  };

  isValidLength = (value) => {
    return value.length !== 0 && value.length <= 1000;
  };

  showError = (isShow, message = "") => {
    if (isShow) {
      this.message.classList.add("text-area__message_error");
    } else {
      this.message.classList.remove("text-area__message_error");
    }
    this.error.textContent = message;
  };

  clear = () => {
    this.showError(false);
    this.message.classList.remove("text-area__message_success");
  };
}

export default TextArea;
