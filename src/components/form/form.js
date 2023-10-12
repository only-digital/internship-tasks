import Component from '../../app/js/base/component';

const MAX_EMAIL_LENGTH = 255;
const MAX_MESSAGE_LENGTH = 1000;
const MAX_FILES = 2;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const EMAIL_REGEX =
  /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/;

class Form extends Component {
  constructor(element) {
    super(element);

    this.inputEmail = this.getElement('input-email');
    this.labelEmail = this.getElement('label-email');
    this.errorEmail = this.getElement('error-email');
    this.errorMsg = this.getElement('error-msg');
    this.submitButton = this.getElement('submit');

    this.inputMsg = this.getElement('input-msg');
    this.labelMsg = this.getElement('label-msg');
    this.fileList = document.getElementById('file-list');
    this.errorFiles = this.getElement('error-files');
    this.countFilesError = this.getElement('files-error');
    this.indicator = this.getElements('input-indicator');
    this.checkbox = this.getElement('acceptance-checkbox');
    this.errorCheckbox = this.getElement('error-acceptance');
    this.fileInput = this.getElement('files-btn');

    this.formError = this.getElement('error-form');

    this.uploadedFiles = [];

    this.setupLabelAnimation();
    this.setupFileList();
  }

  handleCheckboxChange() {
    if (this.checkbox.checked) {
      this.destroyError(this.errorCheckbox);
    }
    this.updateSubmitButton();
  }

  setupFileList() {
    this.fileInput.addEventListener('change', () => this.handleFiles(this.fileInput));
  }

  setupLabelAnimation() {
    this.inputEmail.addEventListener('focus', () =>
      this.handleFocus(this.inputEmail, this.labelEmail),
    );
    this.inputMsg.addEventListener('focus', () => this.handleFocus(this.inputMsg, this.labelMsg));
    this.inputEmail.addEventListener('blur', () =>
      this.handleBlur(this.inputEmail, this.labelEmail),
    );
    this.inputMsg.addEventListener('blur', () => this.handleBlur(this.inputMsg, this.labelMsg));

    this.inputEmail.addEventListener('input', () =>
      this.handleInputValidation(this.inputEmail, this.errorEmail),
    );
    this.inputMsg.addEventListener('input', () =>
      this.handleInputValidation(this.inputMsg, this.errorMsg),
    );

    this.submitButton.addEventListener('click', (event) => this.handleSubmit(event));
    this.checkbox.addEventListener('change', () => this.handleCheckboxChange());
  }

  handleFocus(input, label) {
    input.classList.add('focused-input');
    label.classList.add('focused-label');
  }

  handleBlur(input, label) {
    if (!input.value) {
      label.classList.remove('focused-label');
      input.classList.remove('focused-input', 'filled-input');
      input.nextElementSibling.classList.remove('visible-indicator');
      this.destroyError(input);
    } else {
      input.classList.add('filled-input');
      input.nextElementSibling.classList.add('visible-indicator');
    }

    if (input === this.inputEmail) {
      if (input.value && !this.isValidEmail(input.value)) {
        this.displayError(this.errorEmail, 'Неверный формат email');
        input.nextElementSibling.classList.remove('visible-indicator');
        input.classList.add('form__input-error');
        input.classList.remove('filled-input');
      } else if (input.value.length > MAX_EMAIL_LENGTH) {
        this.displayError(
          this.errorEmail,
          `Email не должен содержать более ${MAX_EMAIL_LENGTH} символов`,
        );
        input.nextElementSibling.classList.remove('visible-indicator');
        input.classList.add('form__input-error');
        input.classList.remove('filled-input');
      } else {
        this.destroyError(this.errorEmail);
        input.nextElementSibling.classList.add('visible-indicator');
        input.classList.remove('form__input-error');
      }
    }
    if (input === this.inputMsg) {
      if (input.value.length > MAX_MESSAGE_LENGTH) {
        this.displayError(
          this.errorMsg,
          `Сообщение не должно содержать более ${MAX_MESSAGE_LENGTH} символов`,
        );
        input.nextElementSibling.classList.remove('visible-indicator');
        input.classList.add('form__input-error');
      } else {
        this.destroyError(this.errorMsg);
        input.nextElementSibling.classList.add('visible-indicator');
        input.classList.remove('form__input-error');
      }
    }

    if (input.value === '') {
      input.nextElementSibling.classList.remove('visible-indicator');
      input.classList.remove('form__input-error');
    }

    this.updateSubmitButton();
  }

  handleBlurValidation(input, errorElement) {
    if (input === this.inputEmail && input.value.length > 255) {
      this.displayError(errorElement, 'Email не должен содержать более 255 символов');
      input.nextElementSibling.classList.remove('visible-indicator');
    } else if (input === this.inputMsg && input.value.length > 1000) {
      this.displayError(
        this.errorMsg,
        `Сообщение не должно содержать более ${MAX_MESSAGE_LENGTH} символов`,
      );
      input.nextElementSibling.classList.remove('visible-indicator');
    } else {
      this.destroyError(errorElement);
    }
  }

  handleInputValidation(input, errorElement) {
    if (input === this.inputEmail && input.value.length > 255) {
      this.displayError(errorElement, 'Email не должен содержать более 255 символов');
      input.nextElementSibling.classList.remove('visible-indicator');
      input.classList.add('form__input-error');
      this.submitButton.classList.add('disabled');
    } else {
      this.destroyError(errorElement);
      this.submitButton.classList.remove('disabled');
    }

    if (input === this.inputMsg && input.value.length > 1000) {
      this.displayError(errorElement, 'Сообщение не должно содержать более 1000 символов');
      input.nextElementSibling.classList.remove('visible-indicator');
      input.classList.add('form__input-error');
      this.submitButton.classList.add('disabled');
    } else {
      this.destroyError(errorElement);
      this.submitButton.classList.remove('disabled');
    }
  }

  updateSubmitButton() {
    const emailError = this.errorEmail.textContent;
    const msgError = this.errorMsg.textContent;

    const hasErrors = emailError || msgError || !this.inputEmail.value || !this.inputMsg.value;
    this.submitButton.disabled = hasErrors;
  }

  isValidEmail(email) {
    return EMAIL_REGEX.test(email);
  }

  setupFileList() {
    const input = document.querySelector('.form__files-btn');
    input.addEventListener('change', () => this.handleFiles(input));
  }

  handleFiles(input) {
    const files = input.files;
    let hasInvalidSize = false;

    if (this.uploadedFiles.length + files.length > MAX_FILES) {
      this.countFilesError.classList.add('visible-files-error');
      this.countFilesError.addEventListener('click', () =>
        this.countFilesError.classList.remove('visible-files-error'),
      );
      return;
    }

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        hasInvalidSize = true;
        break;
      }
    }

    if (hasInvalidSize) {
      this.displayError(this.errorFiles, 'Максимальный размер файла 5 MB');
      return;
    }

    this.destroyError(this.errorFiles);

    this.uploadedFiles = this.uploadedFiles.concat(Array.from(files));
    this.updateFileList();
  }

  updateFileList() {
    this.fileList.innerHTML = '';

    for (const file of this.uploadedFiles) {
      const li = document.createElement('li');
      const fileInfo = document.createElement('div');
      fileInfo.classList.add('file-info');

      const fileType = this.getFileType(file);
      const fileSize = this.formatSize(file.size);

      const words = [`Документ`, fileType + ',', fileSize];

      for (const word of words) {
        const span = document.createElement('span');
        span.textContent = `${word} `;
        span.classList.add('file-info__text');
        fileInfo.appendChild(span);
      }

      const deleteIcon = document.createElement('span');
      deleteIcon.textContent = '✕';
      deleteIcon.classList.add('delete-icon');
      deleteIcon.addEventListener('click', () => this.deleteFile(li, file));

      li.appendChild(fileInfo);
      li.appendChild(deleteIcon);
      this.fileList.appendChild(li);

      if (this.uploadedFiles.length === 0) {
        this.fileInput.value = '';
      }
    }
  }

  displayError(container, message) {
    container.textContent = message;
  }

  destroyError(container) {
    container.textContent = '';
  }

  deleteFile(li, file) {
    li.remove();
    this.uploadedFiles = this.uploadedFiles.filter((uploadedFile) => uploadedFile !== file);
    this.updateFileList();
    this.updateSubmitButton();
  }

  getFileType(file) {
    const allowedFormats = ['pdf', 'doc', 'docx'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    
    if(allowedFormats.includes(fileExtension)) {
      return fileExtension.toUpperCase(); 
    }

    return;
  }

  formatSize(bytes) {
    if (bytes === 0) return '0 B';
    const sizes = ['B', 'kB', 'mB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
  }

  clearForm() {
    this.inputEmail.value = '';
    this.inputMsg.value = '';
    this.uploadedFiles = [];
    this.checkbox.checked = false;
    this.formError.textContent = 'Форма отправлена';
    this.formError.style.color = 'green';

    this.inputEmail.classList.remove('focused-input', 'filled-input');
    this.inputEmail.nextElementSibling.classList.remove('visible-indicator');
    this.labelEmail.classList.remove('focused-label');
    this.inputMsg.classList.remove('focused-input', 'filled-input');
    this.labelMsg.classList.remove('focused-label');
    this.inputMsg.nextElementSibling.classList.remove('visible-indicator');
    this.submitButton.classList.add('disabled');

    setTimeout(() => {
      this.formError.textContent = '';
    }, 3000);
    this.updateFileList();
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.checkbox.checked) {
      this.displayError(this.errorCheckbox, 'Согласие на обработку является обязательным');
      return;
    } else {
      this.destroyError(this.errorCheckbox);
    }

    const data = {
      email: this.inputEmail.value,
      message: this.inputMsg.value,
      confirm: this.checkbox.checked,
      files: this.uploadedFiles.map((file) => file.name),
    };

    const dataJSON = JSON.stringify(data);

    fetch('/form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: dataJSON,
    }).catch((error) => {
      console.error('Ошибка:', error);
      this.formError.textContent = 'Ошибка отправки формы';
    });

    this.formError.textContent = 'Форма отправлена';
    this.formError.style.color = 'green';
    this.clearForm();
  };
}

export default Form;
