import Component from "../../app/js/base/component";

const MAX_MB = 5242880;

class InputFile extends Component {
  constructor(element) {
    super(element);

    this.filesList = new DataTransfer();
    this.wrapper = this.getElement("wrapper");
    this.file = this.getElement("input");
    this.error = this.getElement("error");
    this.message = this.getElement("message");
    this.list = this.getElement("list");
    this.template = document.querySelector(".template");

    this.file.addEventListener("change", this.fileValidation);
  }

  fileValidation = () => {
    const files = event.target.files;
    this.error.classList.remove("input-file__error_show");
    this.error.textContent = "";

    if (this.filesList.files.length === 2) {
      this.showFilesMessage();
      this.wrapper.classList.add("disabled");
      return;
    }

    if (files.length + this.filesList.files.length > 2) {
      this.showFilesMessage();
      return;
    }

    for (const file of files) {
      if (file.size > MAX_MB) {
        this.error.classList.add("input-file__error_show");
        this.error.textContent = "Максимальный размер файла 5 MB";
      } else {
        this.createElementFile(file);
        this.filesList.items.add(file);
        this.file.files = this.filesList.files;
      }
    }

    if (this.filesList.files.length === 2) {
      this.wrapper.style.marginRight = "20px";
    } else {
      this.wrapper.style.marginRight = "32px";
    }
  };

  showFilesMessage = () => {
    this.message.classList.add("input-file__message_show");
    setTimeout(
      () => this.message.classList.remove("input-file__message_show"),
      3000
    );
  };

  createElementFile = (file) => {
    let fileName = file.name.split(".")[0];
    let typeFile = this.returnTypeFile(file.type);
    let sizeFile = this.returnFileSize(file.size);

    const item = this.template.content.cloneNode(true);
    const element = item.querySelector(".input-file__item");
    item.querySelector(".input-file__item-name").textContent = fileName;
    item.querySelector(
      ".input-file__item-size"
    ).textContent = `${typeFile}, ${sizeFile}`;
    item
      .querySelector(".input-file__item-close")
      .addEventListener(
        "click",
        this.removeElementFile.bind(null, file.name, element)
      );

    this.list.append(item);
  };

  removeElementFile = (fileName, element) => {
    let index = 0;
    for (const file of this.filesList.files) {
      if (file.name === fileName) {
        this.filesList.items.remove(index);
      }
      index++;
    }

    this.file.files = this.filesList.files;
    element.remove();
    this.wrapper.style.marginRight = "32px";
    this.wrapper.classList.remove("disabled");
  };

  returnTypeFile = (type) => {
    switch (type) {
      case "application/pdf":
        return "PDF";
      case "application/msword":
        return "DOC";
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return "DOCX";
    }
  };

  returnFileSize = (number) => {
    if (number < 1024) {
      return `${number} bytes`;
    } else if (number >= 1024 && number < 1048576) {
      return `${(number / 1024).toFixed(1)} kB`;
    } else if (number >= 1048576) {
      return `${(number / 1048576).toFixed(1)} MB`;
    }
  };
}

export default InputFile;
