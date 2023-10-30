import Component from "../../app/js/base/component";

class MyForm extends Component {
  buttonElement;
  emailInput;
  baseURL;
  myCheckboxElement;
  serverRes;
  errorElement;
  form;
  input;
  checkboxInput;
  responseHTML;
  responseMessage;

  constructor(element) {
    super(element);
    this.baseURL = "http://localhost:3000";
    this.buttonElement = this.getElement("btn");
    this.emailInput = this.getElement("email");
    this.myCheckboxElement = this.getElement("checkbox");
    this.errorElement = this.getElement("error");
    this.form = this.getElement("form");
    this.input = this.getElement("input");
    this.responseHTML = this.getElement("response");
    this.responseMessage = this.getElement("response-message");
    this.checkboxInput = document.querySelector(".my-checkbox");

    this.buttonElement.addEventListener("click", this.onClick);
    this.serverRes;
  }

  onClick = async (e) => {
    e.preventDefault();
    this.errorElement.textContent = "";
    this.buttonElement.classList.add("blocked");
    this.myCheckboxElement.classList.add("blocked");
    this.input.classList.add("blocked");
    const data = {
      email: this.emailInput.value,
      confirm: this.checkboxInput.checked,
    };
    await this.sendData(data);
  };

  sendData = async (data) => {
    try {
      const res = await fetch(`${this.baseURL}/form`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      const statusCode = res.status;
      this.serverRes = { ...json, code: statusCode };
      if (statusCode !== 200) {
        this.errorElement.textContent = this.serverRes.message;
        this.buttonElement.classList.remove("blocked");
        this.myCheckboxElement.classList.remove("blocked");
        this.input.classList.remove("blocked");
      } else {
        this.buttonElement.classList.add("hidden");
        this.responseHTML.classList.remove("hidden");
        this.responseMessage.textContent = this.serverRes.message;
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };
}

export default MyForm;
