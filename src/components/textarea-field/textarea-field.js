import Component from "../../app/js/base/component";

class MessageTextarea extends Component {
  messageTextarea;
  messageTextareaError;

  constructor(element) {
    super(element);

    this.messageTextarea = this.getElement("field");
    this.messageTextareaError = this.getElement("error-message");

    this.messageTextarea.addEventListener("focus", this.handleTextarea);
    this.messageTextarea.addEventListener("blur", this.checkValidity);
  }

  handleTextarea = () => {
    this.root.classList.remove("error");
    this.root.classList.remove("fill");
    this.messageTextareaError.textContent = "";
  };

  checkValidity = () => {
    if (!this.messageTextarea.value.length) {
      this.root.classList.add("error");
      this.messageTextareaError.textContent =
        "Поле сообщения обязательно для заполнения";
      return;
    } else if (this.messageTextarea.value.length > 1000) {
      this.root.classList.add("error");
      this.messageTextareaError.textContent =
        "Поле сообщения должно содержать до 1000 символов";
      return;
    } else {
      this.messageTextareaError.textContent = "";
      this.root.classList.add("fill");
    }
  };
}

export default MessageTextarea;
