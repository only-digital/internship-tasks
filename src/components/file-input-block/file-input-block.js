import Component from "../../app/js/base/Component";
import { formatSize, renderPopover } from "../utils";

const MB = 1048576
const FORMATS = ["pdf", "doc", "docx"]

class FileInputBlock extends Component {
  constructor(element) {
    super(element);
    this.files = [];

		this.inputError = this.getElement("error")
		this.elsWrapper = this.getElement("wrapper");
    this.form = this.root.closest("form");
    this.form.addEventListener("submit", this.onSubmitCapture, true);
    this.input = this.getElement("input");
    this.input.addEventListener("change", this.onFileInputChange);
  }

  onSubmitCapture = (e) => {
    if (this.validate()) {
      e.files = this.files;
    } else {
      e.stopPropagation();
    }
		e.preventDefault()
  };

  onFileInputChange = () => {
    if (this.validate([...this.files, ...this.input.files])) {
      this.files.push(...this.input.files);
      this.renderFiles([...this.input.files]);
      this.input.value = null;
    }
  };

  validate = (files = this.files) => {
    if (files.length === 0) {
      return renderPopover(this.root, "Обязательное поле");
    }
    if (files.length > 2) {
      return renderPopover(this.root, "Вы можете загрузить только 2 документа");
    }
		if (files.some((el) => el.size > MB * 5)) {
			this.inputError.textContent = "Максимальный размер файла 5 MB";
			return false;
		}
		if (files.some((el) => !FORMATS.some((el2) => el.type.includes(el2)))) {
			this.inputError.textContent = `Допустимые форматы: ${FORMATS.join(', ')}`;
			return false
		}
		this.inputError.textContent = null
    return true;
  };

  renderFiles = (files) => {
    const els = [];
    for (const file of files) {
      const fileItem = document.createElement("div");
      fileItem.classList.add("file-item");
      fileItem.innerHTML = `
      <span class="type">Документ</span>&nbsp;
      <span class="info">${file.type.split("/")[1].toUpperCase()}, ${formatSize(
        file.size
      )}</span>&nbsp;
      <button class="remove-btn"></button>
    `;

      const removeButton = fileItem.querySelector(".remove-btn");
      const onClose = () => {
        this.files = this.files.filter(
          (listFile) => listFile.name !== file.name
        );
        removeButton.removeEventListener("click", onClose);
        fileItem.remove();
      };
      removeButton.addEventListener("click", onClose);

      els.push(fileItem);
    }
    this.elsWrapper.append(...els);
  };
}

export default FileInputBlock;
