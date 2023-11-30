import Component from "../../app/js/base/component";

class MyForm extends Component {
  buttonElement;
  baseURL;

  wrapper;

  emailInput;
  emailValid;
  emailError;
  emailIcon;

  textInput;
  textValid;
  textError;
  textIcon;

  checkboxInput;
  fileInput;
  constructor(element) {
    super(element);
    this.baseURL = "http://localhost:3000";
    this.buttonElement = this.getElement("submit-btn");

    this.wrapper = document.querySelectorAll(".text-field");

    this.emailInput = document.querySelector(".my-email");
    this.emailError = document.querySelector(".text__field-email-error");
    this.emailIcon = document.querySelector(".text-field__email-ok-icon");

    this.textInput = document.querySelector(".my-textarea");
    this.textError = document.querySelector(".text__field-textarea-error");
    this.textIcon = document.querySelector(".text-field__textarea-ok-icon");

    this.checkboxInput = document.querySelector(".my-checkbox");
    this.fileInput = this.getElement("btn-input");

    this.emailInput.addEventListener("input", () => this.checkEmail());
    this.emailInput.addEventListener("blur", () =>
      this.showError(
        this.emailValid,
        this.emailInput,
        this.emailError,
        "Неверный формат E-mail",
        this.emailIcon,
        this.wrapper[0].childNodes[3]
      )
    );
    this.emailInput.addEventListener("focus", () =>
      this.hideError(
        this.emailInput,
        this.emailError,
        this.wrapper[0].childNodes[3]
      )
    );

    this.textInput.addEventListener("input", () => this.checkTextArea());

    this.textInput.addEventListener("blur", () =>
      this.showError(
        this.textValid,
        this.textInput,
        this.textError,
        "Введите сообщение",
        this.textIcon,
        this.wrapper[1].childNodes[3]
      )
    );

    this.textInput.addEventListener("focus", () =>
      this.hideError(
        this.textInput,
        this.textError,
        this.wrapper[1].childNodes[3]
      )
    );

    this.buttonElement.addEventListener("click", this.onClick);

    console.log(this.wrapper[0].childNodes[3]);
  }

  checkEmail = () => {
    const emailRegExp =
      /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/;
    this.emailValid = emailRegExp.test(this.emailInput.value);
  };

  checkTextArea = () => {
    this.textValid = this.textInput.validity.valid;
  };

  showError = (isValid, input, errorEl, validMessage, icon, label) => {
    if (input.value === "") {
      label.classList.remove("active");
      return;
    }
    if (isValid) {
      input.classList.remove("invalid");
      input.classList.add("valid");
      icon.style.display = "block";
      errorEl.textContent = "";
    } else {
      input.classList.add("invalid");
      input.classList.remove("valid");
      icon.style.display = "none";
      errorEl.textContent = validMessage;
    }
  };

  hideError = (input, errorEl, label) => {
    label.classList.add("active");
    if (input.classList.contains("invalid")) {
      input.classList.remove("invalid");
      errorEl.textContent = "";
    }
  };

  onClick = async (e) => {
    e.preventDefault();

    const data = {
      email: this.emailInput.value,
      text: this.textInput.value,
      confirm: this.checkboxInput.checked,
    };
    console.log(data);
    // await this.sendData(data);
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
      console.log(json, statusCode);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };
}

export default MyForm;
