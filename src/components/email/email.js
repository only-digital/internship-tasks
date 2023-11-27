import Component from "../../app/js/base/Component";
import checkForm from "../../utils/checkForm";

class Email extends Component {
  constructor(element) {
    super(element);

    this.MAX_LENGTH = 255;
    this.EMAIL_PATTERN =
      /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/;

    this.EMAIL_ERROR_VALID = "Не валидный адрес почты";
    this.EMAIL_ERROR_REQUIRED = "Поле обязательно для заполнения";
    this.EMAIL_ERROR_LENGTH = `Длина не должна превышать ${this.MAX_LENGTH} символов`;

    this.ERROR_CLASS = "email__error";
    this.VALID_CLASS = "email__valid";

    this.email = this.getElement("input");
    this.emailBlock = document.querySelector(".email");
    this.msg = this.getElement("msg");

    this.email.addEventListener("blur", this.checkEmail);
    this.email.addEventListener("input", this.handleChange);
  }

  handleChange = () => {
    this.emailBlock.classList.remove(this.VALID_CLASS);
    this.emailBlock.classList.remove(this.ERROR_CLASS);
    checkForm();
  };

  checkEmail = () => {
    if (!this.email.value.trim()) {
      this.msg.innerText = this.EMAIL_ERROR_REQUIRED;
      this.emailBlock.classList.add(this.ERROR_CLASS);

      return;
    }
    if (this.email.value.trim().length > this.MAX_LENGTH) {
      this.msg.innerText = this.EMAIL_ERROR_LENGTH;
      this.emailBlock.classList.add(this.ERROR_CLASS);

      return;
    }
    if (!this.EMAIL_PATTERN.test(this.email.value.trim())) {
      this.msg.innerText = this.EMAIL_ERROR_VALID;

      this.emailBlock.classList.add(this.ERROR_CLASS);
      this.emailBlock.classList.remove(this.VALID_CLASS);

      return;
    }

    this.emailBlock.classList.add(this.VALID_CLASS);
    this.emailBlock.classList.remove(this.ERROR_CLASS);
    checkForm();
  };
}

export default Email;
