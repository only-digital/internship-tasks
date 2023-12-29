import Component from "../../app/js/base/component";

class FeedbackComponent extends Component {
  url;
  inputEmail;
  invalidEmailText;
  textareaEl;
  fileEl;
  filesClearIcon;
  filesContainer;
  filesInfoText;
  invalidFileText;
  checkboxConfirm;
  submitBtn;
  form;
  regexEmail =
    /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/;
  maxEmailLength = 255;
  maxTextAreaLength = 1000;
  oneKilobyteToByte = 1024;
  allowedFileFormats = ["pdf", "doc", "docx"];

  constructor(element) {
    super(element);
    this.url = "/form";
    this.filesClearIcon = this.getElement("files_clear_icon_id");
    this.invalidEmailText = this.getElement("invalid-email");
    this.invalidTextareaText = this.getElement("invalid-message");
    this.inputEmail = this.getElement("input-email");
    this.textareaEl = this.getElement("textarea-message");
    this.checkboxConfirm = this.getElement("checkbox-confirm");
    this.fileEl = this.getElement("input-file");
    this.filesContainer = this.getElement("files");
    this.invalidFileText = this.getElement("invalid-file");
    this.filesInfoText = this.getElement("files__text");
    this.submitBtn = this.getElement("submit-btn");
    this.form = this.getElement("form");
    this.checkboxConfirm.addEventListener("change", this.handleCheckboxConfirm);
    this.fileEl.addEventListener("change", this.handleChangeFile);
    this.inputEmail.addEventListener("blur", this.validateEmail);
    this.textareaEl.addEventListener("blur", this.validateTextarea);
    this.inputEmail.addEventListener("input", this.removeInvalidEmailText);
    this.textareaEl.addEventListener("input", this.removeInvalidTextareaText);
    this.form.addEventListener("submit", this.handleSubmit);
    this.filesClearIcon.addEventListener("click", this.clearFiles);
  }

  handleCheckboxConfirm = () => {
    this.validateForm();
  };

  validateEmail = (e) => {
    const emailValue = e.target.value;
    if (emailValue.length === 0 || emailValue.length > this.maxEmailLength) {
      this.invalidEmailText.textContent = `Электронная почта обязательна и количество символов не должно превышать ${this.maxEmailLength}`;
      this.inputEmail.classList.remove("valid");
      this.inputEmail.classList.add("invalid");
    }
    else if (!this.regexEmail.test(emailValue)) {
      this.invalidEmailText.textContent = "Email не является допустимым";
      this.inputEmail.classList.remove("valid");
      this.inputEmail.classList.add("invalid");
    }
    else {
      this.invalidEmailText.textContent = "";
      this.inputEmail.classList.remove("invalid");
      this.inputEmail.classList.add("valid");
    }
    this.validateForm();
  };

  removeInvalidEmailText = () => {
    if (this.invalidEmailText.textContent.length > 0) {
      this.invalidEmailText.textContent = "";
    }
  };
  removeInvalidTextareaText = () => {
    if (this.invalidTextareaText.textContent.length > 0) {
      this.invalidTextareaText.textContent = "";
    }
  };

  validateTextarea = (e) => {
    const textValue = e.target.value;
    if (textValue.length > 0 && textValue.length < this.maxTextAreaLength) {
      this.invalidTextareaText.textContent = "";
      this.textareaEl.classList.remove("invalid");
      this.textareaEl.classList.add("valid");
    } else {
      this.invalidTextareaText.textContent = "Сообщение ошибки";
      this.textareaEl.classList.remove("valid");
      this.textareaEl.classList.add("invalid");
    }
    this.validateForm();
  };

  validateFileFormat = (format) => this.allowedFileFormats.includes(format);

  formatSizeFile = (size) =>
    size > this.oneKilobyteToByte
      ? `${Math.round(size / 1024)} kB`
      : `${Math.round(size)} b`;

  clearFiles = () => {
    this.filesInfoText.innerHTML = '';
    this.filesContainer.classList.remove("show");
    this.invalidFileText.textContent = "";
    this.fileEl.type = 'input';
    this.fileEl.type = 'file'
  }
  handleChangeFile = (e) => {
    const [{ name = "", size = "" }] = [...e.target.files];
    const [filename, format] = name.split(".");
    const isValidFileFormat = this.validateFileFormat(format);
    this.invalidFileText.textContent = "";
    this.filesInfoText.innerHTML = "";
    this.filesContainer.classList.remove("show");

    if (!isValidFileFormat) {
      this.invalidFileText.textContent = "Недопустимый формат файла";
      this.fileEl.classList.remove("valid");
      this.fileEl.classList.add("invalid");
    } else {
      const formattedSize = this.formatSizeFile(size);
      this.filesInfoText.innerHTML = `${filename} <span class="feedback-component__files__text-additional">${format.toUpperCase()}, ${formattedSize}</span>`;
      this.fileEl.classList.remove("invalid");
      this.fileEl.classList.add("valid");
      this.filesContainer.classList.add("show");
    }
    this.validateForm();
  };

  validateForm = () => {
    const isValidForm = [this.inputEmail, this.textareaEl, this.fileEl].every(
      (el) => el.classList.contains("valid")
    );

    if (isValidForm && this.checkboxConfirm.checked) {
      this.submitBtn.removeAttribute("disabled");
    } else {
      this.submitBtn.setAttribute("disabled", "");
    }
  };

  sendData = async (data) => {
    const response = await fetch(this.url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const newData = {
      confirm: this.checkboxConfirm.checked,
      email: data.email,
      files: data.file,
      message: data.message,
    };
    try {
      await this.sendData(newData);
    } catch (error) {
      console.log(error);
    }
  };
}

export default FeedbackComponent;
