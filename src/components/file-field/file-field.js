import Component from "../../app/js/base/component";

class FileField extends Component {
  fileField;
  filesList;

  constructor(element) {
    super(element);

    this.fileField = this.getElement("input");
    this.filesList = this.getElement("files");

    this.fileField.addEventListener("change", this.showFiles);
    this.root.addEventListener("click", this.removeFile);
  }

  showFiles = () => {
    this.filesList.innerHTML = "";
    for (let file of this.fileField.files) {
      const fileSize = (file.size / 1024).toFixed();
      if (fileSize > 5000) continue;

      const fileNameArr = file.name.split(".");
      const fileFormat = fileNameArr.pop().toUpperCase();
      const fileName = fileNameArr.join();

      const newFile = this.createFile(fileName, fileFormat, fileSize);
      this.filesList.append(newFile);

      if (this.filesList.children.length === 2) break;
    }
  };

  createFile = (name, format, size) => {
    const file = this.createFragment("div", "file-field__file");
    const fileName = this.createFragment("span", "file-field__file-name", name);
    const fileInfo = this.createFragment(
      "span",
      "file-field__file-info",
      `${format}, ${size} kB`
    );
    const fileIcon = this.createFragment("span", "file-field__file-icon");
    file.append(fileName, fileInfo, fileIcon);
    return file;
  };

  createFragment = (frTag, frClass, frText = undefined) => {
    const fragment = document.createElement(frTag);
    fragment.className = frClass;
    fragment.textContent = frText;
    return fragment;
  };

  removeFile = (e) => {
    const files = document.getElementsByClassName("file-field__file");
    const file = e.target.closest(".file-field__file");
    const index = Array.from(files).indexOf(file);

    if (file) {
      const fileBuffer = new DataTransfer();

      for (let i = 0; i < this.fileField.files.length; i++) {
        if (index !== i) fileBuffer.items.add(this.fileField.files[i]);
      }
      this.fileField.files = fileBuffer.files;

      file.remove();
    }
  };
}

export default FileField;
