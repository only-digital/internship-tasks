import Component from "../../app/js/base/component";

class EmailField extends Component {
  emailField;
  emailError;

  constructor(element) {
    super(element);

    this.emailField = this.getElement("input");
    this.emailError = this.getElement("error-message");

    this.emailField.addEventListener("focus", this.handleInput);
    this.emailField.addEventListener("blur", this.checkValidity);
  }

  handleInput = () => {
    this.root.classList.remove("error");
    this.root.classList.remove("fill");
    this.emailError.textContent = "";
  };

  checkValidity = () => {
    const pattern =
      /^([a-zA-Z-0-9_]+|([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)+)|(".+"))@(([a-zA-Z-0-9]+.)+[a-zA-Z-0-9]{2,})$/;

    if (!this.emailField.value.length) {
      this.showError("Поле e-mail обязательно для заполнения");
      return;
    } else if (this.emailField.value.length > 255) {
      this.showError("E-mail должен содержать до 255 символов");
      return;
    } else if (!pattern.test(this.emailField.value)) {
      this.showError("Некорректный e-mail");
      return;
    } else {
      this.emailError.textContent = "";
      this.root.classList.add("fill");
    }
  };

  showError = (message) => {
    this.root.classList.add("error");
    this.emailError.textContent = message;
  };
}

export default EmailField;
