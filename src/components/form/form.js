import Component from "../../app/js/base/Component";

class Form extends Component {
  URL;
  message;
  submitBtn;
  email;
  checkbox;
  emailTitle;
  dispatched;
  checkboxInput;
  constructor(element) {
    super(element);
    this.URL = "/form";
    this.message = this.getElement("message");
    this.submitBtn = this.getElement("submit");
    this.email = this.getElement("email_input");
    this.checkbox = this.getElement("checkbox");
    this.emailTitle = this.getElement("email_p");
    this.dispatched = this.getElement("dispatched");
    this.checkboxInput = this.getElement("checkbox_input");

    this.form.addEventListener("submit", this.onSubmit);
  }

  onSubmit = e => {
    e.preventDefault();
    const data = {
      email: this.form.email.value,
      confirm: this.form.checkbox.checked,
    };

    this.sendFetching(data);
  };

  sendFetching = async data => {
    const response = await fetch("/form", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    if (response.status === 422) {
      this.errorMessage(json.message);
    } else if (response.status === 200) {
      this.successMessage(json.message);
    }
    return json;
  };

  errorMessage = message => {
    this.message.classList.add("error");
    this.message.innerText = message;
  };
  successMessage = message => {
    this.message.classList.remove("error");
    // this.message.innerText = message;
    this.message.innerText = "";
    this.emailTitle.classList.add("disabled");
    this.checkbox.classList.add("disabled");
    this.email.classList.add("disabled");
    this.checkboxInput.disabled = true;
    this.email.disabled = true;
    this.submitBtn.style.display = "none";
    this.dispatched.style.display = "flex";
  };
}

export default Form;
