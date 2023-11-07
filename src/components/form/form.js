import Component from '../../app/js/base/component';

class Form extends Component {
    inputs;
    fileInput;
    fileSection;
    messageInput;
    messageHiddenClone;
    emailInput;
    emailErrorText;
    tooltips;
    fileWrap;
    fileTextError;
    submit;
    checkboxInput;
    checkboxLabel;
    form;

    constructor(element) {
        super(element);

        this.emailErrorText = this.getElement('email-error-text')
        this.inputs = this.root.querySelectorAll('.form__input')
        this.messageInput = this.getElement('message-input')
        this.messageHiddenClone = this.getElement('message-hidden-clone')
        this.emailInput = this.getElement('email-input')
        this.tooltips = this.root.querySelectorAll('.form__input-text')
        this.fileInput = this.getElement('file-hidden-input')
        this.fileSection = this.getElement('file-wrap')
        this.fileWrap = this.getElement('file-output')
        this.fileTextError = this.getElement('file-text-error')
        this.submit = this.getElement('submit')
        this.checkboxInput = this.getElement('checkbox-hidden-input')
        this.checkboxLabel = this.getElement('checkbox-label')
        this.form = document.forms.form

        this.inputs.forEach(input => {
            input.addEventListener('change', this.fieldChangeHandler)
            input.addEventListener('input', this.fieldInputHandler)
        })

        this.messageInput.addEventListener('input', this.autoHeight)
        this.fileInput.addEventListener('change', this.fileChangeHandler)
        this.submit.addEventListener('submit', this.submitHandler)
        this.checkboxLabel.addEventListener('click', this.checkCheckbox)
        this.checkboxInput.addEventListener('click', this.stopEvent)
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.formSubmit()
    }

    fileChangeHandler = ({ target }) => {
        this.fileCheck()
        this.renderFiles(target)

        this.checkFIelds()
    }

    fieldChangeHandler = ({ target }) => {
        if (target.hasAttribute('data-reg')) {
            this.regCheck(target)
        } else {
            this.messageCheck(target)
        }

        this.checkFIelds()
    }

    fieldInputHandler = ( { target } ) => {
        this.clearStatus(target)
        this.showTooltip(target)

        if (target.hasAttribute('data-reg')) {
            this.limitInput(target, 255)
        } else {
            this.limitInput(target, 1000)
        }
    }

    regCheck = (input) => {
        const inputValue = input.value
        const inputReg = input.getAttribute('data-reg')
        const reg = new RegExp(inputReg)
        
        if (inputValue !== '') {
            if (!reg.test(inputValue)) {
                this.showError(input, 'Неправильный формат')
            } else {
                this.showSuccess(input)
            }
        } else {
            this.showError(input, 'Поле обязательно')
        }
    }

    messageCheck = (input) => {
        if (input.value) {
            this.showSuccess(input)
        } else {
            this.showError(input, 'Поле обязательно')
        }
    }

    showTooltip = (input) => {
        if (input.value) {
            input.nextSibling.classList.add('form__input-text--shown')
        } else {
            input.nextSibling.classList.remove('form__input-text--shown')
        }
    }
    
    showError = (input, text) => {
        const errorText = input.previousElementSibling

        input.classList.add('input--error')
        errorText.textContent = text
    }

    clearStatus = (input) => {
        const errorText = input.previousElementSibling

        input.classList.remove('input--error')
        input.classList.remove('input--success')

        errorText.textContent = ''
        input.setAttribute('isValid', '0')
    }

    showSuccess = (input) => {
        input.classList.add('input--success')
        input.setAttribute('isValid', '1')
    }

    limitInput = (input, limit) => {
        if (input.value.length >= limit) {
            input.value = input.value.substr(0, limit)
        }
    }

    autoHeight = ({ target }) => {
        this.messageHiddenClone.textContent = this.messageInput.value

        if (this.messageHiddenClone.offsetHeight > 191) {
            target.style.height = this.messageHiddenClone.offsetHeight + 'px' 
        } else {
            target.style.height = '191px'
        } 

        if (!target.value) {
            target.removeAttribute('style')
        }
    }

    createFile = (textValue, sizeValue, index) => {
        const file = document.createElement('div')
        const textWrapper = document.createElement('div')
        const text = document.createElement('p')
        const dataWrapper = document.createElement('div')
        const dataType = document.createElement('p')
        const dataSize = document.createElement('p')
        const button = document.createElement('button')
        
        file.addEventListener('click', this.removeFile)

        file.classList.add('form__file-elem')   
        file.setAttribute('index', index)
        textWrapper.classList.add('form__file-text-wrap')   
        text.classList.add('form__file-text')   
        dataWrapper.classList.add('form__file-data-wrap')   
        dataType.classList.add('form__file-data-type')   
        dataSize.classList.add('form__file-data-size')  
        button.classList.add('form__file-button')

        file.append(textWrapper)
        file.append(dataWrapper)
        file.append(button)

        textWrapper.append(text)
        dataWrapper.append(dataType)
        dataWrapper.append(dataSize)

        let typeValue; 
        [textValue, typeValue] = textValue.split('.')

        text.textContent = textValue.slice(0, 13) + '...'
        dataType.textContent = typeValue.toUpperCase() + ','
        dataSize.textContent = Math.ceil(sizeValue / 1024) + ' kB'

        return file
    }

    removeFile = ({ target }) => {
        const files = this.fileInput.files
        
        const indexToRemove = +target.getAttribute('index')
        console.log(indexToRemove)

        const newFiles = []

        for (var i = 0; i < files.length; i++) {
            if (i !== indexToRemove) {
                newFiles.push(files[i])
            }
        }

        this.fileInput.value = ''

        const dataTransfer = new DataTransfer();
        
        for (var i = 0; i < newFiles.length; i++) {
            dataTransfer.items.add(newFiles[i]);
        }

        this.fileInput.files = dataTransfer.files;
        console.log(this.fileInput.files)
        this.renderFiles(this.fileInput)
    }

    renderFiles = (input) => {   
        this.fileWrap.innerHTML = ''

        const files = Array.from(input.files)

        files.forEach((fileElem, index) => {
            const file = this.createFile(fileElem.name, fileElem.size, index)
            this.fileWrap.append(file)
        })  

        this.fileSection.append(this.fileWrap)
    }

    fileCheck = () => {
        this.fileTextError.textContent = ''
        this.fileTextError.classList.remove('form__file-text-error--active')

        const files = Array.from(this.fileInput.files)

        files.forEach((file) => {
            const size = Math.ceil(file.size / 1024)
            const maxSize = 5000
            if (size > maxSize) {
                this.fileTextError.textContent = 'Максимальный размер файла 5 MB'
                this.fileInput.value = ''
                this.fileInput.setAttribute('isValid', '0')
                return
            }
        })

        if (files.length > 2) {
            this.fileInput.value = ''
            this.fileTextError.textContent = 'Вы можете загрузить только 2 документа'
            this.fileInput.setAttribute('isValid', '0')
            this.fileTextError.classList.add('form__file-text-error--active')
            return
        }

        this.fileInput.setAttribute('isValid', '1')
    }

    checkFIelds = () => {
        const inputsArr = []
        const isAllValid = []

        inputsArr.push(...this.inputs, this.fileInput, this.checkboxInput)

        inputsArr.forEach((input) => {
            isAllValid.push(+input.getAttribute('isValid'))
        })

        const isValid = isAllValid.reduce((acc, current) => {
            return acc && current
        })

        if (!isValid) { 
            this.submit.classList.add('form__submit--disabled')
            this.submit.setAttribute('tabindex', '-1')
            this.submit.removeEventListener('click', this.submitHandler)
        } else {
            this.submit.classList.remove('form__submit--disabled')
            this.submit.setAttribute('tabindex', '0')
            this.submit.addEventListener('click', this.submitHandler)
        }
    }

    checkCheckbox = () => {
        console.log('test')
        if (+this.checkboxInput.getAttribute('isValid')) {
            this.checkboxInput.setAttribute('isValid', '0')
        }   else {
            this.checkboxInput.setAttribute('isValid', '1')
        }

        this.checkFIelds()
    }   

    formSubmit = () => {
        const formData = new FormData(this.form)

        this.sendData(formData)
    }

    sendData = async (data) => {
        return await fetch('/form', {
            method: 'POST',
            body: data
        })
    }

    stopEvent = (e) => {
        e.stopPropagation()
    }
}

export default Form