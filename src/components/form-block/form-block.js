import Component from "../../app/js/base/Component";

const EMAIL_REGEXP =
  /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/;

class FormBlock extends Component {
  constructor(element) {
    super(element);

    this.submitButton = this.getElement("submit-button");
    this.invalidFields = new Set();
    this.form = this.getElement("form");
    this.form.addEventListener("submit", this.onSubmit);
    this.inputs = this.root.querySelectorAll(
      '.field :not(input[type="file"]):is(input, textarea)'
    );
    this.inputs.forEach((el) => {
      el.addEventListener("input", this.onInput);
      el.addEventListener("invalid", this.onInvalid);
      el.addEventListener("blur", this.onBlur);
    });
  }

  onInput = (e) => {
    this.clearFieldError(e.target);
  };

  onInvalid = (e) => {
    this.setFieldError(e.target);
    e.preventDefault();
  };

  onBlur = (e) => {
    if (e.target.checkValidity() && this.checkCustomValidity(e.target)) {
      this.setFieldValid(e.target);
    }
  };

  // аттрибут pattern почему-то не работает с regexp (ошибка)
  checkCustomValidity = (el) => {
    switch (el.getAttribute("name")) {
      case "email":
        if (!EMAIL_REGEXP.test(el.value)) {
          this.setFieldError(el, "Некорректный формат");
          return false;
        }
    }
    return true;
  };

  setFieldError = (inputEl, message) => {
    const field = inputEl.closest(".field");
    field.classList.remove("valid");
    field.classList.add("invalid");
    field.querySelector(".error").textContent =
      message || this.getErrorMessage(inputEl);
    this.invalidFields.add(inputEl.getAttribute("name"));
    this.updateButtonState();
  };

  getErrorMessage = (el) => {
    if (el.validity.valueMissing) return "Обязательное поле";
    if (el.validity.patternMismatch) return "Некорректный формат";
  };

  setFieldValid = (inputEl) => {
    const field = inputEl.closest(".field");
    field.classList.remove("invalid");
    field.classList.add("valid");
    field.querySelector(".error").textContent = "";
    this.invalidFields.delete(inputEl.getAttribute("name"));
    this.updateButtonState();
  };

  updateButtonState = () => {
    if (this.invalidFields.size > 0) {
      this.submitButton.setAttribute("disabled", "disabled");
    } else {
      this.submitButton.removeAttribute("disabled");
    }
  };

  clearFieldError = (inputEl) => {
    const field = inputEl.closest(".field");
    field.classList.remove("invalid");
    field.querySelector(".error").textContent = "";
		this.invalidFields.delete(inputEl.getAttribute('name'))
		this.updateButtonState()
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("confirm", formData.get("confirm") === "on");
    formData.set("files", e.files);

    const data = Object.fromEntries(formData);
    console.log("data :>> ", data);

    const res = await fetch("/form", {
      body: formData,
      method: "POST",
    });
  };
}

export default FormBlock;
