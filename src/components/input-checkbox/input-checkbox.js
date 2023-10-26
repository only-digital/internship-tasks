import Component from "../../app/js/base/component";

class InputCheckbox extends Component {
  constructor(element) {
    super(element);

    this.accept = this.getElement("accept");
    this.error = this.getElement("error");

    this.accept.addEventListener("click", this.validation);
  }

  validation = () => {
    if (event.target.checked) {
      this.error.classList.remove("input-checkbox__error_show");
    } else {
      this.error.classList.add("input-checkbox__error_show");
    }
  };
}

export default InputCheckbox;
