import Component from '../../app/js/base/component'

class FeedbackForm extends Component {
  constructor(element) {
    super(element)

    this.emailInputElement = this.getElement('content__email__input')
    this.messageEmailElement = this.getElement('content__email__message')
    this.emailInputElement.addEventListener('blur', this.blurEmail)
    this.emailInputElement.addEventListener('input', this.inputEmail)

    this.textInputElement = this.getElement('content__text__input')
    this.messageTextElement = this.getElement('content__text__message')
    this.textInputElement.addEventListener('blur', this.blurText)
    this.textInputElement.addEventListener('input', this.inputText)

    this.checkboxInputElement = this.getElement('content__checkbox__input')
    this.checkboxInputElement.addEventListener('change', this.changeCheckbox)

    this.fileButtonElement = this.getElement('content__file-upload__button')
    this.fileButtonElement.addEventListener('click', this.fileUploadButton)
    this.fileInputElement = this.getElement('content__file-upload__input')
    this.fileInputElement.addEventListener('change', this.fileUploadInput)
    this.messageFileElement = this.getElement('content__file-upload__message')
    this.file1Element = document.getElementById('file-1')
    this.file2Element = document.getElementById('file-2')
    this.blockFileElement = this.getElement('content__file-upload__block')
    this.blockFileElement.addEventListener('click', this.deleteFileEvent)

    this.submitElement = this.getElement('content__submit')
    this.root.addEventListener('submit', this.onSubmit)
  }

  blurEmail = (element) => {
    let email = element.target.value

    let setErrorState = (message) => {
      this.messageEmailElement.textContent = message
      element.target.classList.add('error-input')
      element.target.classList.remove('validation-succes')
    }

    if (!email.length) {
      setErrorState('Обязательно для заполнения')
    } else if (email.length > 256) {
      setErrorState('Максимальное количество символов 255')
    } else if (!this.isEmailValid(email)) {
      setErrorState('Пожалуйста, укажите email')
    } else {
      element.target.classList.remove('error-input')
      element.target.classList.add('validation-succes')
    }

    this.isSubmitDisabled()
  }
  isEmailValid = (value) => {
    const EMAIL_REGEXP =
      /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/
    return EMAIL_REGEXP.test(value)
  }
  inputEmail = (element) => {
    element.target.classList.remove('error-input')
    this.messageEmailElement.textContent = ''
  }

  blurText = (element) => {
    let text = element.target.value

    let setErrorState = (message) => {
      this.messageTextElement.textContent = message
      element.target.classList.add('error-input')
      element.target.classList.remove('validation-succes')
    }

    if (text.length === 0) {
      setErrorState('Обязательно для заполнения')
    } else if (text.length > 1000) {
      setErrorState('Максимальное количество символов 1000')
    } else {
      element.target.classList.add('validation-succes')
    }

    this.isSubmitDisabled()
  }
  inputText = (element) => {
    element.target.classList.remove('error-input')
    this.messageTextElement.textContent = ''
    this.textInputElement.style.height =
      this.textInputElement.scrollHeight + 'px'
  }
  changeCheckbox = (element) => {
    element.target.checked
      ? element.target.classList.add('validation-succes')
      : element.target.classList.remove('validation-succes')
    this.isSubmitDisabled()
  }

  isSubmitDisabled() {
    this.submitElement.classList[
      this.emailInputElement.classList.contains('validation-succes') &&
      this.textInputElement.classList.contains('validation-succes') &&
      this.checkboxInputElement.classList.contains('validation-succes')
        ? 'remove'
        : 'add'
    ]('disabled')
  }

  fileUploadButton = () => {
    this.fileInputElement.click()
    this.messageFileElement.textContent = ''
  }
  fileUploadInput = () => {
    if (this.fileInputElement.files.length > 2) {
      this.messageFileElement.textContent = 'Максимум два файла'
      this.fileInputElement.value = ''
    } else {
      const fileElements = [this.file1Element, this.file2Element]
      const fileInputElements = [
        this.fileInputElement.files[0],
        this.fileInputElement.files[1],
      ]
      for (let i = 0; i < fileElements.length; i++) {
        if (fileInputElements[i]) {
          this.handleFileDisplay(
            fileElements[i],
            fileInputElements[i].name,
            fileInputElements[i].size,
            i
          )
        } else {
          fileElements[i].style.display = 'none'
        }
      }
    }
  }

  handleFileDisplay(fileElement, fileName, fileSize, index) {
    const [name, extension] = fileName.split('.')
    if (!this.isExtensionValid(extension)) {
      this.deleteFile(index)
      this.messageFileElement.textContent =
        'Допустимые форматы прикрепляемых файлов: .pdf, .doc, .docx'
    } else if (this.isSizeValid(fileSize)) {
      this.deleteFile(index)
      this.messageFileElement.textContent = 'Максимальный размер файла 5 MB'
    } else {
      fileElement.style.display = 'flex'
      const nameElement = fileElement.querySelector('.name-file')
      const formatElement = fileElement.querySelector('.file-format')
      nameElement.textContent = name
      formatElement.textContent =
        extension.toUpperCase() + ', ' + this.fileSizeCalculation(fileSize)
    }
  }
  fileSizeCalculation = (value) => {
    const sizes = ['Bytes', 'kB', 'mB']
    if (value === 0) return '0 Bytes'
    const i = Math.floor(Math.log(value) / Math.log(1024))
    value = Number((value / Math.pow(1024, i)).toFixed(2))
    return `${value} ${sizes[i]}`
  }
  isExtensionValid = (value) => {
    const EXTENSION_REGEXP = /(pdf|doc|docx)/i
    return EXTENSION_REGEXP.test(value)
  }
  isSizeValid = (value) => {
    const BYTES_IN_MB = Math.pow(1024, 2)
    const MAX_SIZE_MB = 5
    const sizeInMB = value / BYTES_IN_MB
    return sizeInMB > MAX_SIZE_MB
  }
  deleteFileEvent = (event) => {
    if (event.target.tagName == 'svg') {
      let fileIndex = event.target.closest('button').id.split('-')[1]
      this.deleteFile(fileIndex - 1)
    }
  }
  deleteFile = (fileIndex) => {
    const files = [...this.fileInputElement.files]
    const dt = new DataTransfer()
    files
      .filter((file, index) => index !== fileIndex)
      .forEach((file) => dt.items.add(file))
    const file_list = dt.files
    this.fileInputElement.files = file_list
    this.fileUploadInput()
  }

  onSubmit = async (event) => {
    event.preventDefault()
    const url = 'http://localhost:3000/form'
    let data = {
      email: this.emailInputElement.value,
      confirm: this.checkboxInputElement.checked,
      message: this.textInputElement.value,
      file: this.fileInputElement.files,
    }
    try {
      let response = await this.sendData(url, data)
    } catch (error) {
      console.error(error)
    }
  }

  async sendData(url, data) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
      })
      return await response
    } catch (error) {
      console.error(error)
    }
  }
}

export default FeedbackForm
