import Component from '../../app/js/base/Component';

class TextareaField extends Component {
    textareaField;
    textareaError;
  
    constructor(element) {
      super(element);
  
      this.textareaField = this.getElement("textarea");
      this.textareaError = this.getElement("error-message");
  
      this.textareaField.addEventListener("focus", this.handleTextarea);
      this.textareaField.addEventListener("blur", this.checkValidity);
      this.textareaField.addEventListener("input", this.changeHeight);
    }
  
    changeHeight = (e) => {
      e.target.style.maxHeight = e.target.scrollHeight + "px";
      e.target.style.minHeight = e.target.scrollHeight + "px";
    };
  
    handleTextarea = () => {
      this.root.classList.remove("error");
      this.root.classList.remove("fill");
      this.textareaError.textContent = "";
    };
  
    checkValidity = () => {
      if (!this.textareaField.value.length) {
        this.showError("Поле сообщения обязательно для заполнения");
        return;
      } else if (this.textareaField.value.length > 1000) {
        this.showError("Поле сообщения должно содержать до 1000 символов");
        return;
      } else {
        this.textareaError.textContent = "";
        this.root.classList.add("fill");
      }
    };
  
    showError = (message) => {
      this.root.classList.add("error");
      this.textareaError.textContent = message;
    };
  }
  
  export default TextareaField;