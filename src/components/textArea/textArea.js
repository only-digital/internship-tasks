import Component from "../../app/js/base/Component";
import checkForm from "../../utils/checkForm";

class TextArea extends Component {
  constructor(element) {
    super(element);

    this.MAX_LENGTH = 1000;

    this.ERROR_REQUIRED = "Поле обязательно для заполнения";
    this.ERROR_LENGTH = `Длина не должна превышать ${this.MAX_LENGTH} символов`;

    this.ERROR_CLASS = "textArea__error";
    this.VALID_CLASS = "textArea__valid";

    this.fieldBlock = document.querySelector(".textArea");
    this.field = this.getElement("item");
    this.msg = this.getElement("msg");

    this.field.addEventListener("blur", this.checkField);
    this.field.addEventListener("input", this.handleChange);
  }

  handleChange = () => {
    this.fieldBlock.classList.remove(this.VALID_CLASS);
    this.fieldBlock.classList.remove(this.ERROR_CLASS);
    checkForm();
  };

  checkField = () => {
    if (!this.field.value.trim()) {
      this.msg.innerText = this.ERROR_REQUIRED;
      this.fieldBlock.classList.add(this.ERROR_CLASS);

      return;
    }

    if (this.field.value.trim().length > this.MAX_LENGTH) {
      this.msg.innerText = this.ERROR_LENGTH;
      this.fieldBlock.classList.add(this.ERROR_CLASS);

      return;
    }

    this.fieldBlock.classList.add(this.VALID_CLASS);
    this.fieldBlock.classList.remove(this.ERROR_CLASS);
    checkForm();
  };
}

export default TextArea;
