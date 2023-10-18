import Component from "../../app/js/base/component";

class EmailInput extends Component {
  emailInput;
  emailErrorMessage;

  constructor(element) {
    super(element);

    this.emailInput = this.getElement("field");
    this.emailErrorMessage = this.getElement("error-message");

    this.emailInput.addEventListener("focus", this.handleInput);
    this.emailInput.addEventListener("blur", this.checkValidity);
  }

  handleInput = () => {
    this.root.classList.remove("error");
    this.root.classList.remove("fill");
    this.emailErrorMessage.textContent = "";
  };

  checkValidity = () => {
    const pattern =
      /^([a-zA-Z-0-9_]+|([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)+)|(".+"))@(([a-zA-Z-0-9]+.)+[a-zA-Z-0-9]{2,})$/;

    if (!this.emailInput.value.length) {
      this.root.classList.add("error");
      this.emailErrorMessage.textContent =
        "Поле e-mail обязательно для заполнения";
      return;
    } else if (this.emailInput.value.length > 255) {
      this.root.classList.add("error");
      this.emailErrorMessage.textContent =
        "E-mail должен содержать до 255 символов";
      return;
    } else if (!pattern.test(this.emailInput.value)) {
      this.root.classList.add("error");
      this.emailErrorMessage.textContent = "Некорректный e-mail";
      return;
    } else {
      this.emailErrorMessage.textContent = "";
      this.root.classList.add("fill");
    }
  };
}

export default EmailInput;
