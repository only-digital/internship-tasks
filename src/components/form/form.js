import Component from "../../app/js/base/Component";

class Form extends Component {
  formElement;
  emailElement;
  messageElement;
  agreeElement;
  filesElement;
  submitElement;
  emailRegexp;
  allowedExtensions;
  errorElement;
  fileErrorElement;
  fileListElement;
  successElement;
  constructor(element) {
    super(element);
    //Получаю доступ к используемым элементам
    this.formElement = document.querySelector(".form");
    this.emailElement = document.querySelector(".form-fields__email");
    this.messageElement = document.querySelector(".form-fields__textarea");
    this.agreeElement = document.querySelector(".form-fields__checkbox");
    this.filesElement = document.querySelector(".form-fields__file__input");
    this.fileListElement = document.querySelector(
      ".form-fields__file__wrapper"
    );
    this.submitElement = document.querySelector(".form-fields__submit");
    this.errorElement = document.querySelectorAll(".form-fields__error");
    this.fileErrorElement = document.querySelector(".file-error");
    this.successElement = document.querySelector(".form-fields__success");
    this.emailRegexp =
      /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/;

    //Обработчик для отправки формы
    this.formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = {
        email: this.emailElement.value,
        message: this.messageElement.value,
        files: this.filesElement.files,
        agree: this.agreeElement.value,
      };
      this.submitForm(data);
    });

    //Обработчик для снятия фокуса с поля email
    this.emailElement.addEventListener("blur", () => {
      if (
        !this.validateEmail(
          this.emailElement,
          this.errorElement[0],
          this.emailRegexp
        )
      ) {
        this.submitElement.setAttribute("disabled", "true");
      } else {
        this.submitElement.removeAttribute("disabled");
      }
    });
    //Обработчик для снятия фокуса с textarea
    this.messageElement.addEventListener("blur", () => {
      if (!this.validateMessage(this.messageElement, this.errorElement[1])) {
        this.submitElement.setAttribute("disabled", "true");
      } else {
        this.submitElement.removeAttribute("disabled");
      }
    });

    const maxSize = 5 * 1024 * 1024; //Максимальный размер файла
    let files = []; //Хранилище файлов
    //Обработчик для input type=file
    this.filesElement.addEventListener("change", (event) => {
      const newFiles = Array.from(event.target.files);
      const numFiles = files.length + newFiles.length;
      //Проверка на количество загруженных файлов
      if (numFiles > 2) {
        this.fileErrorElement.textContent =
          "Вы можете загрузить только 2 элемента";
        this.fileErrorElement.style.display = "block";
        //Таймер для исчезновения сообщения о превышении допустимого количества загрузок
        setTimeout(() => {
          this.fileErrorElement.style.display = "none";
        }, 5000);
        return;
      } else {
        this.fileErrorElement.style.display = "none";
      }
      //Проверка на размер и добавление на страцу и в хранилище файла
      newFiles.forEach((file) => {
        if (file.size > maxSize) {
          this.errorElement[2].textContent = "Максимальный размер файла 5 MB";
          this.errorElement[2].style.display = "block";
          return;
        }
        const downloadItem = document.createElement("div");
        const fileName = document.createElement("span");
        const fileSize = document.createElement("span");
        const deleteButton = document.createElement("button");

        fileName.textContent = file.name;
        fileSize.textContent = `(${this.formatSize(file.size)})`;
        //Обработчик для удаления файла
        deleteButton.addEventListener("click", () => {
          downloadItem.remove();
          files.splice(files.indexOf(file), 1);
        });
        downloadItem.classList.add("form-fields__download");
        downloadItem.appendChild(fileName);
        downloadItem.appendChild(fileSize);
        downloadItem.appendChild(deleteButton);

        this.fileListElement.appendChild(downloadItem);

        files.push(file);
      });
    });
  }
  formatSize = (size) => {
    const units = ["B", "KB", "MB", "GB"];

    for (let i = units.length - 1; i >= 0; i--) {
      const threshold = Math.pow(1024, i);

      if (size >= threshold) {
        return `${(size / threshold).toFixed(2)} ${units[i]}`;
      }
    }

    return size + " B";
  };
  //Функция для проверки email
  validateEmail = (input, error, emailRegexp) => {
    const value = input.value;
    if (value === "") {
      error.textContent = "Это поле обязательно для заполнения";
      error.style.display = "block";
      input.classList.remove("success");
      input.classList.add("error");
      return false;
    } else {
      if (!emailRegexp.test(value)) {
        error.textContent = "Введите корректный e-mail";
        error.style.display = "block";
        input.classList.remove("success");
        input.classList.add("error");
        return false;
      } else {
        if (value.length > 255) {
          error.textContent = "E-mail не должен превышать 255 символов";
          input.classList.add("error");
          return false;
        } else {
          error.textContent = "";
          input.classList.remove("error");
          input.classList.add("success");
          error.style.display = "none";
          return true;
        }
      }
    }
  };
  // Функция для проверки сообщения
  validateMessage = (input, error) => {
    var value = input.value;
    if (value == "") {
      error.textContent = "Это поле обязательно для заполнения";
      error.style.display = "block";
      input.classList.remove("success-text-area");
      input.classList.add("error-text-area");
      return false;
    } else {
      if (value.length > 1000) {
        error.textContent = "Сообщение не должно превышать 1000 символов";
        error.style.display = "block";
        input.classList.remove("success-text-area");
        input.classList.add("error-text-area");
        return false;
      } else {
        error.textContent = "";
        input.classList.remove("error-text-area");
        input.classList.add("success-text-area");
        error.style.display = "none";
        return true;
      }
    }
  };
  // Асинхронная функция для отправки на сервер
  async submitForm(data) {
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("textarea", data.textarea);
      formData.append("file", data.files);
      formData.append("checkbox", data.checkbox);

      const response = await fetch("/form", {
        method: "POST",
        body: formData,
      });
      console.log(response);

      if (response.status === 200) { 
        this.submitElement.style.display = 'none';
        this.successElement.style.display = 'flex'; 
    } 
    } catch (error) {
      console.error(error);
    }
  }
}

export default Form;
