import Component from "../../app/js/base/component";

class InputEmail extends Component {
  input;
  error;

  constructor(element) {
    super(element);

    this.input = this.getElement("input");
    this.error = this.getElement("error");

    this.input.addEventListener("input", this.onInput);
    this.input.addEventListener("blur", this.onChange);
  }

  onInput = () => {
    this.error.textContent = "";
    this.root.classList.remove("error");
    this.root.classList.remove("valid");
  };

  onChange = () => {
    const inputLength = this.input.value.length;
    const maxlength = 255;
    const regTest = this.valid();

    if (!inputLength) {
      this.error.textContent = "Обязательное поле";
      this.root.classList.add("error");
    } else if (inputLength > maxlength) {
      this.error.textContent = "Длинный E-mail";
      this.root.classList.add("error");
    } else if (!regTest) {
      this.error.textContent = "Некорректный E-mail";
      this.root.classList.add("error");
    } else {
      this.root.classList.add("valid");
    }
  };

  valid = () => {
    const reg =
      /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/;
    const inputValue = this.input.value;
    const res = inputValue.match(reg);

    if (!res) {
      return false;
    } else {
      return true;
    }
  };
}

export default InputEmail;
