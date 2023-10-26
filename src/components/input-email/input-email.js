import Component from "../../app/js/base/component";

const EMAIL_REGEXP =
  /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/;

class InputEmail extends Component {
  constructor(element) {
    super(element);

    this.email = this.getElement("input");
    this.error = this.getElement("error");

    this.email.addEventListener("change", this.validation);
    this.email.addEventListener("input", this.clear);
  }

  validation = () => {
    const value = event.target.value;

    if (!this.isValidLength(value)) {
      this.showError(true, "E-mail не должен содержать более 255 символов!");
      return;
    }

    if (!this.isValidValue(value)) {
      this.showError(true, "Некорректный адрес электронной почты!");
      return;
    }

    this.email.classList.add("input-email__input_success");
  };

  isValidValue = (value) => {
    return EMAIL_REGEXP.test(value);
  };

  isValidLength = (value) => {
    return value.length <= 255;
  };

  showError = (isShow, message = "") => {
    if (isShow) {
      this.email.classList.add("input-email__input_error");
    } else {
      this.email.classList.remove("input-email__input_error");
    }
    this.error.textContent = message;
  };

  clear = () => {
    this.showError(false);
    this.email.classList.remove("input-email__input_success");
  };
}

export default InputEmail;
