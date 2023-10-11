import Component from "../../app/js/base/component";

class Form extends Component {
  constructor(element) {
    super(element);
    this.root.addEventListener("click", this.onClick);
    this.dataForSend = {};

    this.file = this.getElement("file-area__file");
    this.fileArea = this.getElement("file-area");
    this.errorFile = this.getElement("file-area__error-file");
    this.file.addEventListener("change", this.onChangeFile);
    this.fileForSend = {};

    this.email = this.getElement("email-input");
    this.emailError = this.getElement("email__error-email");
    this.email.addEventListener("change", this.onChangeEmail);
    this.email.addEventListener("input", this.onInputEmail);

    this.text = this.getElement("text-input");
    this.textError = this.getElement("text__error-text");
    this.text.addEventListener("change", this.onChangeText);
    this.text.addEventListener("input", this.onInputText);

    this.checkbox = this.getElement("checkbox");
    this.checkboxError = this.getElement("checkbox__error-checkbox");
    this.checkbox.addEventListener("change", this.onChangeCheckbox);

    this.submit = this.getElement("submit");

    this.emailSuccessValidation = this.getElement(
      "text-input__success-validation"
    );
    this.textSuccessValidation = this.getElement(
      "text-area__success-validation"
    );
  }

  checkValidation = () => {
    const conditionEmail =
      this.email.value !== "" && this.emailError.innerHTML === "";
    const conditionText =
      this.text.value !== "" && this.textError.innerHTML === "";
    const conditionPolicy = this.checkbox.checked;
    const conditionFile = this.fileForSend.length > 0;


    if (conditionEmail && conditionText && conditionPolicy && conditionFile) {
      this.submit.disabled = false;
    } else {
      this.submit.disabled = true;
    }
  };

  onClick = (event) => {
    const atributeDelete = event.target.getAttribute("data-delete");
    const atributeSubmit = event.target.getAttribute("data-submit");
    const files = this.file.children[0].files;
    if (atributeDelete) {
      delete this.fileForSend[atributeDelete];
      this.fileForSend.length -= 1;
      event.target.parentNode.remove();
      this.checkValidation();
    }

    if (atributeSubmit) {
      this.checkValidation();
      this.dataForSend = {
        email: this.email.value,
        message: this.text.value,
        policy: this.checkbox.checked,
        file: this.fileForSend,
      };

      const postData = fetch(`/form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          ...this.dataForSend,
        }),
      });
    }
  };

  onChangeFile = () => {
    const maxCountFiles = 2;
    const files = this.file.children[0].files;

    const loadedFiles = this.fileArea.querySelectorAll(
      ".form__file-area__file__item"
    );

    if (loadedFiles.length !== 0) {
      loadedFiles.forEach((loadedFile) => {
        loadedFile.remove();
      });
    }
    this.errorFile.innerHTML = "";

    if (files.length > maxCountFiles) {
      this.errorFile.innerHTML = `Вы можете выбрать только ${maxCountFiles} файла`;
      return;
    }
    
    for (let key in files) {
      if (files[key].size > 5000000) {
        this.errorFile.innerHTML = `Размер одного файла не может превышать 5мб`;
        return;
      }

      if (key !== "length" && key !== "item") {
        
        this.fileForSend[key] = files[key];
        const lastPoint = files[key].name.lastIndexOf(".");
        const stringLength = files[key].name.length;
        const extensionFile = files[key].name.slice(
          lastPoint + 1,
          stringLength
        );

        const fileSize = (Number(files[key].size) / 1000000).toFixed(2);

        const itemFile = `
        <div class = "form__file-area__file__item">
            <span class = "form__file-area__file__item__title">Документ </span>
            <span>${extensionFile.toUpperCase()},</span>
            <span>${fileSize}mb</span>
            <span class = "form__file-area__file__item__close" data-delete="${key}">✕</span>
        </div>
      `;

        this.fileArea.insertAdjacentHTML("beforeend", itemFile);
      }
    }
    this.fileForSend["length"] = files["length"];
   
    this.checkValidation();
  };

  onChangeEmail = ({ target }) => {
    const emailAddress = target.value;

    this.emailError.innerHTML = "";
    target.classList.remove("input-text__error");

    const regex =
      /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/;
    if (!emailAddress.match(regex)) {
      this.emailError.innerHTML = "Некорректный адрес email";
      target.classList.add("input-text__error");
    } else if (emailAddress.length > 255) {
      this.emailError.innerHTML =
        'Поле "E-mail" не должно содержать более 255 символов';
      target.classList.add("input-text__error");
    } else {
      this.emailSuccessValidation.style.display = "block";
    }

    this.checkValidation();

    if (emailAddress === "") {
      this.emailError.innerHTML = "";
      target.classList.remove("input-text__error");
    }
  };

  onChangeText = ({ target }) => {
    const message = target.value;

    this.textError.innerHTML = "";
    target.classList.remove("text-area__error");

    if (message.length > 1000) {
      this.textError.innerHTML =
        'Поле "Ваше сообщение" не должно содержать более 1000 символов';
      target.classList.add("text-area__error");
    } else if (message !== "") {
      this.textSuccessValidation.style.display = "block";
    }

    if (message !== "") {
      target.style.height = "120px";
    } else {
      target.style.height = "46px";
    }
    this.checkValidation();
  };

  onChangeCheckbox = () => {
    this.checkValidation();
  };

  onInputEmail = () => {
    this.emailSuccessValidation.style.display = "none";
    if (this.emailError.innerHTML !== "") {
      this.emailError.innerHTML = "";
    }
  };

  onInputText = () => {
    this.textSuccessValidation.style.display = "none";
    if (this.textError.innerHTML !== "") {
      this.textError.innerHTML = "";
    }
  };
}

export default Form;
