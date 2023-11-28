import Component from '../../app/js/base/component';

class FormFeedback extends Component {
    formFieldsState;
    maxSize;

    form;
    labelEmail;
    inputEmail;
    labelMessage;
    inputMessage;
    pEmailError;
    pMessageError;
    labelFile;
    inputFile;
    pFileError;
    wrapperFiles;
    checkbox;
    submitBtn;

    regExpEmail = /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/
    constructor(element) {
        super(element);

        this.maxSize = (1024 * 1024)*5
        this.formFieldsState ={
            email: false,
            message: false,
            files: true,
            checkbox: false
        }

        this.form = this.getElement('form')

        this.labelEmail = this.getElement('form__label-email')
        this.inputEmail = this.getElement('form__email')
        this.pEmailError = this.getElement('form__error-email')
        this.labelMessage = this.getElement('form__message__label')
        this.inputMessage = this.getElement('form__message__textarea')
        this.pMessageError = this.getElement('form__error-message')
        this.labelFile = this.getElement('form__file')
        this.inputFile = this.getElement('form__file-input')
        this.pFileError = this.getElement('form__error-file')
        this.wrapperFiles = this.getElement('files')
        this.checkbox = this.getElement('form__checkbox')
        this.submitBtn = this.getElement('form__button')

        this.inputEmail.addEventListener('blur', this.onBlurEmailHandler)
        this.inputEmail.addEventListener('focus', this.onFocusEmailHandler)

        this.inputMessage.addEventListener('blur', this.onBlurMessageHandler)
        this.inputMessage.addEventListener('focus', this.onFocusMessageHandler)

        this.inputFile.addEventListener('change', this.onChangeFileHandler)
        this.checkbox.addEventListener('click', this.onCheckedHandler)
        this.form.addEventListener('submit', this.onSubmitHandler)
    }

    onBlurEmailHandler = (e) => {
        const email = e.target.value
        const isValidEmail = this.regExpEmail.test(email)
        if(!isValidEmail){
            this.labelEmail.classList.add('invalid')
            this.inputEmail.classList.add('invalid')
            this.labelEmail.classList.remove('valid')
            this.inputEmail.classList.remove('valid')
            this.pEmailError.textContent = 'Неверный e-mail'
            this.formFieldsState.email = false
            this.formValidation()

        }else{
            this.labelEmail.classList.remove('invalid')
            this.inputEmail.classList.remove('invalid')
            this.labelEmail.classList.add('valid')
            this.inputEmail.classList.add('valid')
            this.formFieldsState.email = true
            this.formValidation()
        }
    }

    onFocusEmailHandler = () => {
        this.pEmailError.textContent = ''
    }

    onBlurMessageHandler = (e) => {
        const message = e.target.value.trim()

        if(message === ''){

            this.labelMessage.classList.add('invalid')
            this.inputMessage.classList.add('invalid')
            this.labelMessage.classList.remove('valid')
            this.inputMessage.classList.remove('valid')
            this.pMessageError.textContent = 'Сообщение не может быть пустым'
            this.formFieldsState.message = false
            this.formValidation()

        }else if (message.length >= 1000){

            this.labelMessage.classList.add('invalid')
            this.inputMessage.classList.add('invalid')
            this.labelMessage.classList.remove('valid')
            this.inputMessage.classList.remove('valid')
            this.pMessageError.textContent = 'Сообщение не может содержать больше 1000 символов'
            this.formFieldsState.message = false
            this.formValidation()

        }else {
            this.labelMessage.classList.remove('invalid')
            this.inputMessage.classList.remove('invalid')
            this.labelMessage.classList.add('valid')
            this.inputMessage.classList.add('valid')
            this.formFieldsState.message = true
            this.formValidation()
        }
    }

    onFocusMessageHandler = () =>{
        this.pMessageError.textContent = ''
    }

    onChangeFileHandler = (e) =>{
        const files = [...e.target.files]
        this.labelFile.classList.remove('invalid')
        this.wrapperFiles.innerHTML = ''

        if(files.length > 2){
            this.labelFile.classList.add('invalid')
            this.pFileError.textContent = 'Нельзя выбрать больше 2-х файлов'
            this.formFieldsState.files = false
            this.formValidation()
        }else if(files.length <= 2){
            this.labelFile.classList.remove('invalid')
            this.pFileError.textContent = ''
            this.buildElement(files)
        }
    }

    onCheckedHandler =(e) => {
        this.formFieldsState.checkbox = e.target.checked
        this.formValidation()
    }

    buildElement(elements){
        elements.forEach(el=>{
            if(el.size >= this.maxSize){
                this.pFileError.textContent = 'Максимальный размер файла 5 MB'
                this.labelFile.classList.add('invalid')
                this.formFieldsState.files = false

            }else{
                const item = document.createElement('div')
                item.classList.add('form-feedback__files__item')
                item.textContent = `${el.name}, ${Math.ceil(el.size/1024)} kB`
                this.wrapperFiles.appendChild(item)
                this.formFieldsState.files = true
            }
        })
        this.formValidation()
    }

    onSubmitHandler = (e) => {
        e.preventDefault()
        this.formValidation()
        if(!this.submitBtn.disabled){
            fetch('/form', {
                method: 'POST',
                body: JSON.stringify({
                    email: this.form.elements.email.value,
                    confirm: this.form.elements.checkbox.checked,
                    files: this.form.elements.files.value,
                    message: this.form.elements.message.value
                }),
                headers: {
                    'content-type': 'application/json',
                }
            })
                .then(res => console.log(res))
        }
    }

    formValidation(){
        for(let key in this.formFieldsState){
            if (!this.formFieldsState[key]){
                this.submitBtn.disabled = true
                break
            }else{
                this.submitBtn.disabled = false
            }
        }
    }
}

export default FormFeedback
