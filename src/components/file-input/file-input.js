import Component from '../../app/js/base/Component';

class FileInput extends Component {
  constructor(element) {
    super(element);
    // элементы страницы
    this.fileInput = this.getElement('button');
    this.fileContainer = this.getElement('file-container');
    this.filePseudoButton = this.getElement('pseudo-button');

    // переменные с параметрами валидации

    this.allowedFiles = this.fileInput.dataset.allowed.split(',');
    this.maxSizeUnits = this.fileInput.dataset.maxSize
      .match(/[a-z]{1,2}$/i)[0]
      .toLowerCase();
    this.maxSizeMeaning = this.fileInput.dataset.maxSize.match(/^\d+/)[0];
    this.maxQty = this.fileInput.dataset.maxQty;
    switch (this.maxSizeUnits) {
      case 'b':
        this.maxSize = this.maxSizeMeaning;
        break;
      case 'kb':
        this.maxSize = this.maxSizeMeaning * 1024;
        break;
      case 'mb':
        this.maxSize = this.maxSizeMeaning * 1024 * 1024;
        break;
      case 'gb':
        this.maxSize = this.maxSizeMeaning * 1024 * 1024 * 1024;
        break;
    }

    // переменные валидации
    this.regex = new RegExp(
      this.allowedFiles
        .map((ext) => `(${ext})`)
        .join()
        .replace(/,/g, '|')
    );
    this.inputValid = false;
    this.formData = new FormData();
    this.addedFiles = [];
    this.count = 0;

    // слушатели
    this.fileInput.addEventListener('change', this._checkValidity);
    this.filePseudoButton.addEventListener('click', () =>
      this.fileInput.click()
    );
  }

  _createFileImage = (file) => {
    const fileImage = this.getElement('template').content.cloneNode(true);
    // const fileItem = fileImage.querySelector('.file-input__file-image');
    const fileExtParagraph = fileImage.querySelector('.file-input__file-ext');
    const fileSizeParagraph = fileImage.querySelector('.file-input__file-size');
    const fileDeleteButton = fileImage.querySelector(
      '.file-input__file-delete-button'
    );
    fileDeleteButton.setAttribute('data-name', file.name);
    fileExtParagraph.textContent =
      file.name.match(/\..+$/i).toString().slice(1).toUpperCase() + ',';
    fileSizeParagraph.textContent = `${Math.round(file.size / 1024)} kB`;
    fileDeleteButton.addEventListener('click', this._deleteFile);
    this.fileContainer.append(fileImage);
  };
  _deleteFile = (evt) => {
    const { name } = evt.currentTarget.dataset;
    this.addedFiles = this.addedFiles.filter((file) => file.name !== name);
    evt.target.closest('.file-input__file-image').remove();
    this._checkQty();
    console.log(this.addedFiles);
  };
  _checkValidity = () => {
    const addedFilesName = this.addedFiles.map((file) => file.name);
    const inputFiles = Array.from(this.fileInput.files).filter(
      (file) => !addedFilesName.includes(file.name)
    );
    inputFiles.forEach((file) => {
      const isFormatOk = this._checkFormat(file);
      const isSizeOk = this._checkSize(file);
      if (isFormatOk && isSizeOk) {
        this.addedFiles.push(file);
        if (!this._checkQty()) {
          this.addedFiles.length = this.maxQty;
          return;
        } else {
          this._createFileImage(file);
        }
      }
    });
    console.log(this.addedFiles);
  };

  _checkQty = () => {
    if (this.addedFiles.length > this.maxQty) {
      console.log('файлов больше 2-х');
      this.filePseudoButton.setAttribute('disabled', '');

      return false;
    } else {
      this.filePseudoButton.removeAttribute('disabled');
      return true;
    }
  };

  _checkSize = (file) => {
    if (file.size > this.maxSize) {
      console.log(
        `Максимальный размер файла ${
          this.maxSizeMeaning
        } ${this.maxSizeUnits.toUpperCase()}`
      );
      return false;
    } else {
      return true;
    }
  };
  _checkFormat = (file) => {
    if (this.regex.test(file.name)) {
      return true;
    } else {
      console.log(`Допустимые форматы фалйов:  ${this.allowedFiles} `);
      return false;
    }
  };

  // Your code here
}

export default FileInput;
