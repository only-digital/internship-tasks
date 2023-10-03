import Component from "../../app/js/base/Component";

const svg = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="feedback-file__item-remove" xmlns="http://www.w3.org/2000/svg">
  <g id="Vector">
    <path d="M0 6.53333V7.46667H14V6.53333H0Z" fill="currentColor" />
    <path d="M7.46667 4.07974e-08L6.53333 0L6.53333 14H7.46667L7.46667 4.07974e-08Z"
      fill="currentColor" />
  </g>
</svg>`;

class FeedbackFile extends Component {
  addFile;
  input;
  error;
  maxMessage;
  files = [];
  maxFilesCount;
  maxFileSize;
  container;

  constructor(element) {
    super(element);

    this.maxFilesCount = Number(this.root.dataset.maxfilescount);
    this.maxFileSize = this.getBytes(this.root.dataset.maxfilesize);
    this.maxMessage = this.getElement("button__message");
    this.maxMessage.textContent =
      this.maxFilesCount >= 5
        ? `Вы можете загрузить только ${this.maxFilesCount} документов`
        : `Вы можете загрузить только ${this.maxFilesCount} документа`;
    this.addFile = this.getElement("button");
    this.input = this.getElement("input");
    this.addFile.addEventListener("click", this.onAdd);
    this.input.addEventListener("change", this.onSelectFiles);
    this.container = this.getElement("container");
    this.error = this.getElement("error");
    this.error.textContent = `Максимальный размер файла ${this.root.dataset.maxfilesize}`;

    this.error.remove();
  }

  onAdd = () => {
    this.input.click();
  };

  onSelectFiles = () => {
    if (this.input.files.length > 0) {
      Array.from(this.input.files).forEach((file) => {
        if (
          this.files.length < this.maxFilesCount &&
          !this.isContainFile(file.name)
        ) {
          const Elem = this.appendFile(file);
          const record = {
            name: file.name,
            file: file,
            element: Elem,
          };
          this.files.push(record);
          Elem.addEventListener("click", () => {
            this.removeFile(record);
          });
        }
      });
      this.changeFileList(this.files);
      this.isValid();
    }
  };

  isContainFile(name) {
    if (this.files.find((file) => file.name === name)) {
      return true;
    }
    return false;
  }

  transformSize = (bytes) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }
    if (bytes < 1024 * 1024) {
      bytes = Math.floor(bytes / 1024);
      return `${bytes} kB`;
    }
    bytes = Math.floor(bytes / 1024 / 1024);
    return `${bytes} MB`;
  };

  appendFile = (file) => {
    const Item = document.createElement("div");
    Item.classList.add("feedback-file__item");
    const Title = document.createElement("span");
    Title.textContent = file.name.split(".")[0];
    Title.classList.add("feedback-file__item-title");
    const Ext = document.createElement("span");
    Ext.textContent = `${file.name.split(".").slice(-1)},`;
    Ext.classList.add("feedback-file__item-ext");
    const Size = document.createElement("span");
    Size.textContent = this.transformSize(file.size);
    Size.classList.add("feedback-file__item-size");
    Item.append(Title, Ext, Size);
    Item.innerHTML += svg;
    this.container.append(Item);
    return Item;
  };

  removeFile = (file) => {
    file.element.remove();
    this.removeFileFromFileList(file.name);
    this.files = this.files.filter((item) => item.name !== file.name);
    this.isValid();
  };

  removeFileFromFileList = (name) => {
    const dt = new DataTransfer();
    const { files } = this.input;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (name !== files[i].name) dt.items.add(file);
    }
    this.input.files = dt.files;
  };

  changeFileList = (newList) => {
    const dt = new DataTransfer();
    this.files.forEach((elem) => {
      dt.items.add(elem.file);
    });

    this.input.files = dt.files;
  };

  getBytes = (size) => {
    const count = Number(size.split(" ")[0]);
    const sing = size.split(" ")[1];
    switch (sing) {
      case "GB":
        return count * 1024 * 1024 * 1024;
      case "MB":
        return count * 1024 * 1024;
        break;
      case "kB":
        return count * 1024;
        break;
      default:
        return count;
        break;
    }
  };

  isValid = () => {
    if (this.files.length >= 2) {
      this.addFile.disabled = true;
      this.addFile.classList.add("disabled");
    } else {
      this.addFile.classList.remove("disabled");
      this.addFile.disabled = false;
    }
    let isError = false;
    this.files.forEach((file) => {
      if (file.file.size > this.maxFileSize) {
        isError = true;
      }
    });
    if (isError) {
      this.root.append(this.error);
    } else {
      this.error.remove();
    }
  };
}

export default FeedbackFile;
