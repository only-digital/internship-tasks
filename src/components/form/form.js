import Component from "../../app/js/base/Component";

class Form extends Component {
  URL;
  form;
  loader;
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
    this.form = this.getElement("form");
    this.loader = this.getElement("loader");
    this.arrow = this.getElement("arrow");
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
    this.addLoader();
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
    this.removeLoader();
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
  addLoader = () => {
    this.arrow.style.display = "none";
    this.loader.style.display = "block";
  };
  removeLoader = () => {
    this.loader.style.display = "none";
    this.arrow.style.display = "block";
  };
}

export default Form;
