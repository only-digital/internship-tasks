import Component from "../../app/js/base/Component";

class FeedbackInput extends Component {
  input;
  error;

  constructor(element) {
    super(element);

    this.input = this.getElement("field");
    this.input.addEventListener("change", this.onChange);
    this.input.addEventListener("input", this.onInput);
    this.error = this.getElement("error");
  }

  onInput = () => {
    this.error.textContent = "";
    this.root.classList.remove("success", "error");
  };

  onChange = () => {
    this.root.classList.remove("success", "error");
    this.error.textContent = "";

    if (this.input.value.length > 0) {
      const validRes = this.isValid();
      if (validRes.result) {
        this.root.classList.add("success");
      } else {
        this.root.classList.add("error");
        this.error.textContent = validRes.message;
      }
    }
  };

  isValid = () => {
    const reg = new RegExp(this.root.dataset.regex);
    const maxLength = this.root.dataset.maxlength;
    let result = {
      result: true,
      message: "",
    };

    if (!reg.test(this.input.value)) {
      result = { result: false, message: "E-mail введён не верно" };
    }
    if (maxLength < this.input.value.length) {
      result = {
        result: false,
        message: `E-mail должен быть короче ${maxLength} символов`,
      };
    }
    return result;
  };
}

export default FeedbackInput;
