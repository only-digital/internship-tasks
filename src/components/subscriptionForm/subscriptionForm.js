import Component from "../../app/js/base/Component";

class SubscriptionForm extends Component {

  constructor(element) {
    super(element);

    // адрес сервера
    this.URL = "/form";
    // регулярка
    this.regexp =
      /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/;
    // максимальная длина текста
    this.txtLength = 1000;
    // минимальная длина текста
    this.txtLengthMin = 3;
    // максимальный размер файла
    this.fileSize = 5242880;
    // колличество файлов
    this.fileCount = 2;
    // сообщения об ошибки
    this.emailErrorMaxCount = "Некорректный E-mail";
    this.textErrorMaxLength =
      "Сообщение не должно содержать менее 3 или более 1000 символов";
    this.fileErrorMaxCount = "Максимум 2 файла";
    this.fileErrorMaxSize = "Максимальный размер файла не более 5 MB";
    // валидация формы
    this.state = {
      email: false,
      message: false,
      checkbox: false,
      file: false,
    };
    // массив ключей файлов
    this.filesState = [];

    // элементы
    this.form = this.getElement("form");
    this.submit = this.getElement("submit");

    this.emailLabel = this.getElement("form_email_label");
    this.emailInput = this.getElement("form_email_input");

    this.textareaLabel = this.getElement("form_textarea_label");
    this.textarea = this.getElement("form_textarea_txt");

    this.files = this.getElement("form_files_input");
    this.filesWrapper = this.getElement("form_files_wrapper");

    this.checkbox = this.getElement("checkbox_input");

    this.arrow = this.getElement("arrow");
    this.loader = this.getElement("loader");

    this.emailErrorText = this.getElement("form_email_errorText");
    this.textareaErrorText = this.getElement("form_textarea_errorText");
    this.filesErrorText = this.getElement("form_files_errorText");

    // события
    this.form.email.addEventListener("blur", this.onBlur);
    this.form.email.addEventListener("focus", this.onFocus);

    this.form.textarea.addEventListener("blur", this.onBlur);
    this.form.textarea.addEventListener("focus", this.onFocus);

    this.checkbox.addEventListener("click", this.onCheckbox);
    this.submit.addEventListener("click", this.onSubmit);
    this.files.addEventListener("change", this.onFiles);
  }

  onFiles = e => {
    const file = Object.values(e.target.files);
    this.filesErrorText.classList.remove("active");
    this.filesErrorText.textContent = "";

    if (file.length + this.filesState.length <= 2) {
      file.forEach(e => {
        if (e.size < this.fileSize) {
          this.addedElement(e);
          this.state.file = true;
          this.validForm();
        } else {
          this.filesErrorText.classList.add("active");
          this.filesErrorText.textContent = this.fileErrorMaxSize
          this.state.file = false;
          this.validForm();
          return;
        }
      });
    } else {
      this.filesErrorText.classList.add("active");
      this.filesErrorText.textContent = this.fileErrorMaxCount;
      this.validForm();
      return;
    }
  };

  filesBtn = () => {
    if (this.filesState.length >= 2) {
      this.files.disabled = true;
    } else {
      this.files.disabled = false;
    }
  };

  addedElement = e => {
    const element = document.createElement("div");
    const icon = document.createElement("div");
    const text = document.createElement("p");
    const textKb = document.createElement("p");
    const id = e.size;
    const format = e.name.split(".");
    const name = format.splice(0, format.length - 1).join(".");

    element.classList.add("subscriptionForm__form_files_added-file");
    element.id = id;

    text.textContent = `${name} `;
    textKb.textContent = `${format[format.length - 1]}, ${Math.ceil(
      e.size / 1024
    )} kB`;

    icon.classList.add("subscriptionForm__form_files_icon");
    icon.addEventListener("click", () => this.removeElement(id));

    element.appendChild(text);
    element.appendChild(textKb);
    element.appendChild(icon);
    this.filesWrapper.appendChild(element);

    this.filesState.push(id);
    this.filesBtn();
  };

  removeElement = id => {
    let elem = document.getElementById(id);
    elem.parentNode.removeChild(elem);
    const filterState = this.filesState.filter(e => e !== id);
    this.filesState = filterState;
    this.filesErrorText.textContent = "";
    this.filesBtn();
    this.validForm();
  };

  onFocus = e => {
    if (e.target.name === "email") {
      this.emailLabel.classList.add("active");
      this.emailErrorText.classList.remove("active");
      this.emailErrorText.textContent = '';
      this.emailInput.classList.remove("error");
      this.emailInput.classList.remove("valid");
    } else if (e.target.name === "textarea") {
      this.textarea.classList.remove("error");
      this.textareaLabel.classList.add("active");
      this.textarea.classList.add("active");
      this.textareaErrorText.classList.remove("active");
    }
  };

  onBlur = e => {
    if (e.target.name === "email") {
      this.validEmail(e);
    } else if (e.target.name === "textarea") {
      this.validTexarea(e);
    }
  };

  validEmail = e => {
    const value = e.target.value;
    const valid = this.regexp.test(value);
    if (!valid) {
      this.emailInput.classList.remove("valid");
      this.emailErrorText.classList.add("active");
      this.emailErrorText.textContent = this.emailErrorMaxCount;
      this.emailInput.classList.add("error");
      this.state.email = false;
      this.validForm();
    } else {
      this.emailInput.classList.add("valid");
      this.state.email = true;
      this.validForm();
    }
    if (!value) {
      this.emailErrorText.classList.remove("active");
      this.emailErrorText.textContent = '';
      this.emailInput.classList.remove("error");
      this.emailLabel.classList.remove("active");
      this.state.email = false;
      this.validForm();
    }
  };

  validTexarea = e => {
    const value = e.target.value;
    const valid = value.length < this.txtLength + 1;
    const validMin = value.length > this.txtLengthMin;
    if (!value) {
      this.textareaLabel.classList.remove("active");
      this.textarea.classList.remove("valid");
      this.textarea.classList.remove("active");
      this.textarea.classList.remove("error");
      this.textareaErrorText.textContent = ''
      this.state.message = false;
      this.validForm();
    } else if (value && valid && validMin) {
      this.textarea.classList.add("valid");
      this.textarea.classList.remove("error");
      this.textareaErrorText.textContent = "";
      this.state.message = true;
      this.validForm();
    } else if (value && !valid || !validMin) {
      this.textarea.classList.add("error");
      this.textarea.classList.remove("valid");
      this.textarea.classList.remove("active");
      this.textareaErrorText.classList.add("active");
      this.textareaErrorText.textContent = this.textErrorMaxLength;
      this.state.message = false;
      this.validForm();
    }
  };

  onCheckbox = e => {
    this.state.checkbox = e.target.checked;
    this.validForm();
  };

  validForm = () => {
    if (this.filesState.length === 0) {
      this.state.file = false;
    }
    const valid = !Object.values(this.state).includes(false);
    valid ? (this.submit.disabled = false) : (this.submit.disabled = true);
  };

  onSubmit = e => {
    e.preventDefault();

    const data = new FormData();
    for (const file of this.form.file.files) {
      data.append("files", file, file.name);
    }
    data.append("email", this.form.email.value);
    data.append("text", this.form.textarea.value);
    data.append("confirm", this.form.checkbox.checkbox);
 
    this.sendFetching(data);
  };

  sendFetching = async data => {
    this.addLoader();
    fetch(this.URL, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
      },
      body: data,
    }).then(response => {
      console.log(response);
      this.removeLoader();
    });
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

export default SubscriptionForm;
