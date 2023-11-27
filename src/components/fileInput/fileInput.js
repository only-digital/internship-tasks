import Component from "../../app/js/base/Component";

class FileInput extends Component {
  constructor(element) {
    super(element);

    this.MAX_FILES = 2;
    this.MAX_FILESIZE = 5 * 1024 * 1024;

    this.ERROR_SIZE = "Максимальный размер файла 5Mb";
    this.ERROR_TYPE = "Допустимые файлы: pdf, doc, docx";

    this.ERROR_MSG_CLASS = "fileInput__error-size";
    this.ERROR_COUNT_CLASS = "fileInput__error-count";
    this.ADDED_FILE_BTN_CLASS = "fileInput__files-item";

    this.inputBlock = document.querySelector(".fileInput");
    this.input = this.getElement("input");
    this.msg = this.getElement("msg");

    this.files = [];
    this.filesList = this.getElement("files-list");

    this.input.addEventListener("change", (e) => this.handleFileInput(e));
    this.input.addEventListener("click", this.handleClickInput);
    this.filesList.addEventListener("click", (e) => this.handleRemoveFile(e));
  }

  handleRemoveFile = (e) => {
    e.preventDefault();

    if (e.target.classList.contains(this.ADDED_FILE_BTN_CLASS)) {
      this.files = this.files.filter(
        (file, ind) => ind != e.target.attributes.data.value
      );
      this.appendFiles(this.files);
    }

    this.updateInputFiles();
  };

  handleClickInput = () => {
    this.inputBlock.classList.remove(this.ERROR_MSG_CLASS);
  };

  handleFileInput = (e) => {

    if (e.target.files.length == 0 && this.files.length > 0) {
      this.files = [];
      return;
    }

    if (e.target.files.length + this.files.length > 2) {
      this.inputBlock.classList.add(this.ERROR_COUNT_CLASS);

      setTimeout(() => {
        this.inputBlock.classList.remove(this.ERROR_COUNT_CLASS);
      }, 3000);

      return;
    }

    for (const file of e.target.files) {
      if (!this.validateFileType(file)) {
        this.msg.innerText = this.ERROR_TYPE;
        this.inputBlock.classList.add(this.ERROR_MSG_CLASS);
        continue;
      }
      if (file.size > this.MAX_FILESIZE) {
        this.msg.innerText = this.ERROR_SIZE;
        this.inputBlock.classList.add(this.ERROR_MSG_CLASS);
        continue;
      }

      this.files.push(file);
    }

    this.updateInputFiles();
    this.appendFiles(this.files);
  };

  updateInputFiles = () => {
    const dt = new DataTransfer();

    this.files.forEach((file) => dt.items.add(file));
    this.input.files = dt.files;
  };

  validateFileType = (file) => {
    const types = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    return types.includes(file.type);
  };

  formatFileSize = (size) => {
    const str = size.toString();
    const kilo = 1024;

    if (str.length <= 3) return `${size} B`;

    return `${Math.ceil(size / kilo).toFixed()} kB`;
  };

  formatName = (name) => {
    return name.length > 10 ? `${name.slice(0, 10).trim()}..` : name;
  };

  getFileElement = (file, pos) => {
    const name = this.formatName(file.name.split(".")[0]);
    const type = file.name.split(".")[1].toUpperCase();
    const size = this.formatFileSize(file.size);

    const element = `<div class="fileInput__files-item" data=${pos}><span>${name} <span class="fileInput__files-item_color">${type}, ${size}</span></span></div>`;

    return element;
  };

  appendFiles = (files) => {
    this.filesList.innerHTML = "";

    for (let i = 0; i < files.length; i++) {
      this.filesList.innerHTML += this.getFileElement(files[i], i);
    }
  };
}

export default FileInput;
