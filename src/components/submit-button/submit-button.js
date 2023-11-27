import Component from '../../app/js/base/Component';

class SubmitButton extends Component {
    feedbackForm;
    formEmail;
    formMessage;
    formConfirm;
    formFiles;
  
    constructor(element) {
      super(element);
  
      this.feedbackForm = document.querySelector("#feedback");
      this.formEmail = this.feedbackForm.querySelector(".email-field");
      this.formMessage = this.feedbackForm.querySelector(".textarea-field");
      this.formConfirm = this.feedbackForm.querySelector("#confirm");
  
      this.root.disabled = true;
  
      this.root.addEventListener("mousedown", (e) => {
        e.preventDefault();
      });
  
      this.feedbackForm.addEventListener("input", this.checkformValidity);
      this.feedbackForm.addEventListener("submit", this.sendForm);
    }
  
    checkformValidity = () => {
      const isValid =
        this.formEmail.classList.contains("fill") &&
        this.formMessage.classList.contains("fill") &&
        this.formConfirm.checked;
  
      this.root.disabled = !isValid;
    };
  
    sendForm = async (e) => {
      e.preventDefault();
  
      let response = await fetch("/form", {
        method: "POST",
        body: new FormData(this.feedbackForm),
      });
      console.log(response);
  
      this.resetForm();
    };
  
    resetForm = () => {
      this.feedbackForm.reset();
  
      this.formEmail.classList.remove("fill");
      this.formMessage.classList.remove("fill");
  
      const fields = this.feedbackForm.querySelectorAll("input");
      fields.forEach((field) => {
        field.blur();
      });
    };
  }
  
  export default SubmitButton;