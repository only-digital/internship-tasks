import Component from "../../app/js/base/component";

class InputTextarea extends Component {
  textarea;
  error;

  constructor(element) {
    super(element);

    this.textarea = this.getElement("input");
    this.error = this.getElement("error");

    this.textarea.addEventListener("input", this.onInput);
    this.textarea.addEventListener("blur", this.onChange);
  }

  onInput = () => {
    this.error.textContent = "";
    this.root.classList.remove("error");
    this.root.classList.remove("valid");
  };

  onChange = () => {
    const areaLength = this.textarea.value.length;
    const maxLength = 1000;

    if (!areaLength) {
      this.error.textContent = "Обязательное поле";
      this.root.classList.add("error");
    } else if (areaLength > maxLength) {
      this.error.textContent = "Длинный текст";
      this.root.classList.add("error");
    } else {
      this.root.classList.add("valid");
    }
  };
}

export default InputTextarea;
