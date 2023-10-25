import Component from "../../app/js/base/component";

const maxCountFle = 2;
const maxSizeFile = 5;

class FileButton extends Component {
  button;
  input;
  error;
  tab;
  modal;

  constructor(element) {
    super(element);

    this.button = this.getElement("button");
    this.input = this.getElement("input");
    this.error = this.getElement("error");
    this.tab = this.getElement("tab");
    this.modal = this.getElement("modal");

    this.button.addEventListener("click", this.addFile);
    this.input.addEventListener("input", this.selectFile);
    this.files = [];
  }

  addFile = (e) => {
    e.preventDefault();
    this.input.click();
  };

  selectFile = (e) => {
    this.error.textContent = "";

    const currentFileCount = this.files.length;
    const addFilesCount = e.target.files.length;

    if (currentFileCount + addFilesCount > maxCountFle) {
      this.onModal();
    } else {
      const filesArr = Array.from(e.target.files);

      filesArr.forEach((file) => {
        if (this.validateSize(file)) {
          this.files.push(file);
        }
      });
    }

    this.tab.innerHTML = "";

    this.files.forEach((file) => {
      this.createEl(file);
    });

    this.validateCount();
    this.handleAddFiles(e);
  };

  createEl = (file) => {
    const [name, format] = file.name.split(".");
    const size = file.size;

    const item = document.createElement("div");
    item.classList.add("file-button__tab-item");

    const itemName = document.createElement("span");
    itemName.classList.add("file-button__tab-item__name");
    itemName.textContent = name;

    const itemFormat = document.createElement("span");
    itemFormat.classList.add("file-button__tab-item__format");
    itemFormat.textContent = `${format.toUpperCase()}, ${this.convertSize(
      size
    )}`;

    const itemBtn = document.createElement("button");
    itemBtn.classList.add("file-button__tab-item__remove");
    itemBtn.addEventListener("click", () => this.removeFile(file, item));

    item.appendChild(itemName);
    item.appendChild(itemFormat);
    item.appendChild(itemBtn);

    this.tab.appendChild(item);
  };

  removeFile = (file, item) => {
    this.error.textContent = "";
    this.files = this.files.filter((el) => el.name !== file.name);
    item.remove();
    this.input.value = "";
    this.handleAddFiles();
    this.validateCount();
  };

  convertSize = (size) => {
    if (size < 1024) {
      return `${size} B`;
    } else if (size >= 1024 && size < 1024 * 1024) {
      return `${Math.floor(size / 1024)} kB`;
    } else if (size > 1024 * 1024) {
      return `${Math.floor(size / 1024 / 1024)} mB`;
    }
  };

  validateSize = (file) => {
    if (file.size / (1024 * 1024) > maxSizeFile) {
      this.error.textContent = "Максимальный размер файла 5 MB";
      return false;
    } else {
      return true;
    }
  };

  validateCount = () => {
    if (this.files.length === maxCountFle) {
      this.button.classList.add("disabled");

      this.onModal();
    } else {
      this.button.classList.remove("disabled");
    }
  };

  onModal = () => {
    this.modal.classList.add("active");
    setTimeout(() => {
      this.modal.classList.remove("active");
    }, 5000);
  };

  handleAddFiles = () => {
    const data = new DataTransfer();
    this.files.forEach((file) => {
      data.items.add(file);
    });

    this.input.files = data.files;
  };
}

export default FileButton;
