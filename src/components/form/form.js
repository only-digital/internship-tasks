import Component from "../../app/js/base/Component";

class Form extends Component {
  email;
  errorEmail;
  checkbox;

  constructor(element) {
    super(element);
    this.email = this.getElement("email");  
    this.errorEmail = this.getElement("error-email");
    this.checkbox = this.getElement("checkbox");
    this.svgSuccess = this.getElement("message__success");
    this.svgFault = this.getElement("message__fault");
    this.message = this.getElement("message-text");
    this.submit = this.getElement("submit");
    this.loader = this.getElement("loader");
    this.submit.addEventListener("click", this.sendFeedBack);
    this.email.addEventListener("input", this.onChengeEmail);
    this.checkbox.addEventListener("change", this.onChengeCheckbox);
  }

  onChengeEmail = () => { 
    this.errorEmail.innerHTML = "";
    this.message.innerHTML = "";
    this.svgSuccess.style.display = "none";
    this.svgFault.style.display = "none";
  };

  onChengeCheckbox = () => {
    this.svgSuccess.style.display = "none";
    this.svgFault.style.display = "none";
    this.message.innerHTML = ``;
  }

  sendFeedBack = async () => {
    if (this.email.value === "") {
      this.errorEmail.innerHTML = "Поле E-mail обязательно";
      return;
    }
    this.submit.style.display = "none";
    this.svgSuccess.style.display = "none";
    this.svgFault.style.display = "none";
    this.message.innerHTML = ``;
    this.loader.style.display = "block";

    const postData = await fetch(`/form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        email: this.email.value,
        confirm: this.checkbox.checked,
      }),
    });
    
    const res = await postData.json();

    this.loader.style.display = "none";

    if (postData.ok) {
      this.svgSuccess.style.display = "block";
      this.svgFault.style.display = "none";
      this.email.setAttribute("disabled", "disabled");
      this.checkbox.setAttribute("disabled", "disabled");    
    } else {
      this.svgFault.style.display = "block";
      this.svgSuccess.style.display = "none";
      this.submit.style.display = "flex";
    }
    this.message.innerHTML = `${res.message}`;
  };
}

export default Form;
