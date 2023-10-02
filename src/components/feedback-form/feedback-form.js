import Component from '../../app/js/base/Component';

class FeedbackForm extends Component {
  URL;
  inputEl;
  inputValue;
  checkboxEl;
  buttonSubmitEl;
  formEl;
  isChecked = true;
  inputFileEl;
  regex;
  loadedFile;
  fileSize = [];
  fileCloseIcon = [];
  isCorrectSize;
  uploadInput;
  addFileButton;
  emailFieldEl;
  errorFileEl;
  errorInputEl;
  errorTextEl;
  errorButton;
  errorCheckboxEl;
  textareaLabel;
  isValid = false;
  isCorrectType = true;
  textFieldEl;
  filesArray;
  allowedTypes;
  markSuccessful;
  markSuccessEmail;
  fileUploadsBlock;
  savedFiles = [];
  renderTemp;
  constructor(element) {
    super(element);
    this.URL = '/form';
    this.allowedTypes = ['application/msword','application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    this.regex = new RegExp('^([a-zA-Z\\-0-9_]+|([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)+)|(".+"))@(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z\\-0-9]{2,})$');

    this.fileUploadsBlock = this.getElement('file');
    this.uploadInput = this.getElement('file-button');
    this.addFileButton = this.getElement('file-label');
    this.emailFieldEl = this.getElement('input-field')
    this.buttonSubmitEl = this.getElement('button');
    this.formEl = this.getElement('form');
    this.inputEl = this.getElement('field');
    this.textareaLabel = this.getElement('textarea-name');
    this.errorFileEl = this.getElement('message-file');
    this.errorInputEl = this.getElement('message-input');
    this.errorTextEl = this.getElement('message-textarea');
    this.errorCheckboxEl = this.getElement('message-checkbox');
    this.errorButton = this.getElement('message-button');
    this.checkboxEl = this.getElement('checkbox-item');
    this.textFieldEl = this.getElement('textarea-element');
    this.inputFileEl = this.getElement('file-button');
    this.emailFieldEl.addEventListener('blur', this.validateEmail);
    this.textFieldEl.addEventListener('blur', this.validateTextField);
    this.inputFileEl.addEventListener('change', this.onLoadFile);
    this.checkboxEl.addEventListener('change', this.validateCheckbox);
    this.markSuccessful = this.getElement('textarea-image');
    this.markSuccessEmail = this.getElement('input-image');
  }
  saveFiles = (file) => {
    return this.savedFiles.push(...file)
  }

  closePreview = (icon, index) => {
    icon.addEventListener('click', (e) => {
      e.target.parentElement.classList.add('hidden');
      e.target.parentElement.remove();
      this.filesArray.splice(index,1);
      this.checkLimitUploads();
    })
  }

  renderElem = (elem,index) => {
    let newFile =
      `<div class="feedback-form__file-uploads">
          <span class="feedback-form__file-uploads-name">{{name}}, </span>
          <span class="feedback-form__file-uploads-size">{{size}}</span>
          <span class="feedback-form__file-uploads-type"></span>
          <span class="feedback-form__file-uploads-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M0 6.53333V7.46667H14V6.53333H0Z" fill="#909090"></path>
                  <path d="M7.46667 4.07974e-08L6.53333 0L6.53333 14H7.46667L7.46667 4.07974e-08Z" fill="#909090"></path>
              </svg>
          </span>
      </div>`;

    this.renderTemp = newFile
        .replace('{{name}}', this.filesArray[index].name)
        .replace('{{size}}', this.fileSize);
    this.fileUploadsBlock.insertAdjacentHTML('beforeend', `${this.renderTemp}`);
  }

  onLoadFile = () => {
    this.isCorrectSize = true;
    this.isCorrectType = true;
    this.inputFileEl.disabled = false;
    this.filesArray = Object.values(this.inputFileEl.cloneNode(true).files);
    this.saveFiles(this.filesArray)

    this.filesArray.forEach((elem,index) => {
      this.checkFileSize(this.filesArray[index].size);
      this.checkFileType(this.filesArray[index].type)
      if (this.isCorrectSize && this.isCorrectType && !this.inputFileEl.disabled) {
        this.errorFileEl.innerText = '';
        this.renderElem(elem, index);
        this.checkLimitUploads();
      }
    })
    this.fileCloseIcon = this.getElements('file-uploads-icon');

    this.fileCloseIcon.forEach((icon, index) => {
      this.closePreview(icon,index);
      this.checkLimitUploads();
    })
    this.checkTheFields();
  }

  checkFileSize = (size) => {
    if (size > 5 * 1024 * 1024) {
      this.isCorrectSize = false;
      this.errorFileEl.classList.remove('success');
      this.errorFileEl.innerText = 'Размер файла не должен превышать 5 Мб';
    } else if (size > 1024) {
      this.fileSize =`${Math.round(size / 1024)} kB`;
    } else {
      this.fileSize =`${Math.round(size)} b`;
    }
  }

  checkFileType = (file) => {
    if (this.allowedTypes.includes(file)) {
      return true
    } else {
      this.isCorrectType = false;
      this.errorFileEl.classList.remove('success');
      this.errorFileEl.innerText = 'Допустимые форматы - .pdf, .doc, .docx!';
    }
  }

  checkLimitUploads = () => {
    this.loadedFile = this.getElements('file-uploads');

    if (this.loadedFile.length === 2) {
      this.inputFileEl.disabled = true;
      this.addFileButton.classList.add('not-active');
      this.errorFileEl.classList.add('success');
      this.errorFileEl.innerText = 'Вы достигли лимита по количеству загружаемых файлов!';
    } else {
      this.inputFileEl.disabled = false;
      this.addFileButton.classList.remove('not-active');
      this.errorFileEl.classList.remove('success');
      this.errorFileEl.innerText = '';
    }
  }

  checkTheFields = () => {
    this.checkboxEl.checked ? this.isChecked = true : this.isChecked = false;

    if (!this.isChecked || !this.isValid || this.textFieldEl.value === '' || this.uploadInput.files.length < 1) {
      this.buttonSubmitEl.classList.add('not-active');
      this.errorButton.classList.remove('success');
      this.errorButton.innerText = 'Заполните все поля для отправки формы!'
    } else {
      this.errorButton.innerText = '';
      this.buttonSubmitEl.classList.remove('not-active');
      this.formEl.addEventListener('submit', this.submitForm);
      return true
    }
  }

  validateCheckbox = () => {
    this.checkTheFields();
    this.checkboxEl.checked ? this.errorCheckboxEl.innerText = '' : this.errorCheckboxEl.innerText = 'Нужно согласиться с политикой обработки персональных данных!';
  }

  validateEmail = () => {
    this.inputValue = this.emailFieldEl.value;

    this.emailFieldEl.nextElementSibling.style.top = '10px';
    if (this.regex.test(this.inputValue) && this.inputValue !== '' && this.inputValue.length > 1 && this.inputValue.length <= 255) {
      this.errorInputEl.classList.add('success');
      this.errorFileEl.innerText = '';
      this.emailFieldEl.nextElementSibling.style.top = '10px';
      this.markSuccessEmail.classList.add('show');
      this.isValid = true;
    } else if (!this.regex.test(this.inputValue)) {
      this.errorInputEl.classList.remove('success')
      this.errorFileEl.innerText = ''
      this.errorInputEl.innerText = 'Поле Email заполнено не верно!';
      this.markSuccessEmail.classList.remove('show');
      this.emailFieldEl.addEventListener('keydown', (e) => {
        this.errorInputEl.innerText = '';
      })
      this.isValid = false;

      this.emailFieldEl.addEventListener('focus', () => {
        this.emailFieldEl.nextElementSibling.style.top = '10px';
      })
    }
    this.checkTheFields();
  }

  validateTextField = () => {
    this.errorTextEl.innerText = '';
    if (this.textFieldEl.value !== '') {
      this.textFieldEl.style.opacity = '1';
      this.textareaLabel.style.borderBottom = 'none';
      this.markSuccessful.classList.add('show');
    } else {
      this.errorTextEl.classList.remove('success')
      this.textFieldEl.style.opacity = '0';
      this.markSuccessful.classList.remove('show');
      this.textareaLabel.style.borderBottom = '1px solid #DEDEDE';
      this.errorTextEl.innerText = 'Поле не должно быть пустым! Максимальное количество символов - 1000.'

      this.textFieldEl.addEventListener('focus', () => {
        this.textFieldEl.style.opacity = '1';
        this.errorTextEl.innerText = '';
        this.textFieldEl.style.minHeight = '148px';
        this.textareaLabel.style.borderBottom = 'none';
        })
    }
    this.checkTheFields();
  }

  submitForm = async(e) => {
    e.preventDefault();
    this.inputFileEl.disabled = false;
    let formData = new FormData(this.formEl);
    this.loadedFile = this.getElements('file-uploads');

    if (this.loadedFile) {
      formData.delete('file');
      this.loadedFile.forEach((file, index) => {
          formData.append('file', this.savedFiles[index])
      })
    }

    if (this.checkTheFields()) {
      this.buttonSubmitEl.classList.remove('not-active');
      this.errorButton.innerText = '';
      this.fetchRequest(formData);
    }
  }

  fetchRequest = (data) => {
   fetch(this.URL, {
     method: 'POST',
     body: data,
   })
     .then(response => {
       response.ok ? this.successReaction() : this.errorReaction();
     })
 }

  successReaction = () => {
    this.errorButton.classList.add('success');
    this.errorButton.innerText = 'Данные успешно отправлены!';
    setTimeout(() => {
      this.formEl.reset();
      this.errorInputEl.innerText = '';
      this.errorFileEl.innerText = '';
      this.errorTextEl.innerText = '';
      this.errorCheckboxEl.innerText = '';
      this.loadedFile.forEach((e) => {
        e.classList.add('hidden');
        let children = [...e.children];
        children.forEach((element) => {
            element.innerText = '';
        })
        e.remove();
      });
      this.filesArray = [];
      this.buttonSubmitEl.classList.add('not-active');
    },1000)
  }

  errorReaction = () => {
    this.errorButton.classList.remove('success');
    this.errorButton.innerText = 'При отправке данных произошла ошибка!';
  }
}

export default FeedbackForm