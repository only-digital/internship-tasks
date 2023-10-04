import Component from '../../app/js/base/Component';

class FeedbackForm extends Component {
    //Элемент формы
    form;
    formElementCompleted = {
        email: false,
        message: false,
        files: false,
        confirm: false
    }
    buttonSubmit;

    //Элементы для работы с текстовым полем email
    labelEmail;
    inputEmail;
    errorEmail;

    //Элементы для работы с текстовым полем message
    lableMessage;
    inputMessage;
    errorMessage;

    //Элементы для работы с полученными файлами
    wrapperFiles;
    inputFiles;
    buttonAddFiles
    errorFiles;
    maxFileSize;
    filesMass = [];
    typeObj = {
        'vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
        'msword': 'DOC',
        'pdf': 'PDF'
    }

    //Элементы для работы с чекбоксом
    checkboxWrapper;
    checkboxInput;

    //Регулярное выражение для проверки email
    regex = /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/;

    constructor(element) {
        super(element);

        this.form = this.getElement('form');
        this.buttonSubmit = this.getElement('form__button-submit');

        this.form.addEventListener('submit', this.onSubmit);

        this.labelEmail = this.getElement('form__text-email');
        this.inputEmail = this.getElement('form__input-email');
        this.errorEmail = this.getElement('form__error-email');
        
        this.inputEmail.addEventListener('focus', this.onInputFocus.bind(this, this.labelEmail, this.errorEmail, this.inputEmail));
        this.inputEmail.addEventListener('blur', this.onInputEmailBlur);
        
        this.lableMessage = this.getElement('form__text-message');
        this.inputMessage = this.getElement('form__input-message');
        this.errorMessage = this.getElement('form__error-message');
        
        this.inputMessage.addEventListener('focus', this.onInputFocus.bind(this, this.lableMessage, this.errorMessage, this.inputMessage));
        this.inputMessage.addEventListener('blur', this.onInputMessageBlur);

        this.wrapperFiles = this.getElement('form__wrapper-files');
        this.inputFiles = this.getElement('form__wrapper-files-input');
        this.buttonAddFiles = this.getElement('form__wrapper-files-add');
        this.errorFiles = this.getElement('form__error-files');
        this.maxFileSize = 1024 * 1024 * 5;

        this.inputFiles.addEventListener('change', this.onInputFilesChange);

        this.checkboxWrapper = this.getElement('form__checkbox');
        this.checkboxInput = this.getElement('form__checkbox-field');

        this.checkboxInput.addEventListener('change', this.onCheckboxChange);
    }
    
    onInputFocus = (label, error, input) => {
        label.classList.add('active');
        error.textContent = '';
        input.classList.remove('valid');
        input.classList.remove('invalid');
    }
    
    onInputEmailBlur = (event) => {
        const isValid = this.regex.test(event.target.value);
        if(isValid) {
            this.inputEmail.classList.add('valid');
        } else {
            this.inputEmail.classList.add('invalid');
            this.errorEmail.textContent = 'Некорректный email';
        }
        this.formElementCompleted.email = isValid;
        this.onFormCompleted();
    }

    onInputMessageBlur = (event) => {
        const message = event.target.value;
        const isValid = message.length <= 1000 && message.trim().length > 0;
        if(isValid) {
            this.inputMessage.classList.add('valid');
        } else {
            this.inputMessage.classList.add('invalid');
            this.errorMessage.textContent = 'Поле обязательно для заполнения и не должно превышать 1000 символов';
        }
        this.formElementCompleted.message = isValid;
        this.onFormCompleted();
    }

    onInputFilesChange = (event) => {
        const files = [...event.target.files];
        this.errorFiles.textContent = '';
        if(files.length > 2) {
            this.errorFiles.textContent = 'Допустимо максимум 2 файла';
        } else if(this.isFilesSizeValid(files)) {
            this.createFileItems(files);
        } else {
            this.errorFiles.textContent = 'Максимальный размер файла 5 МБ';
        }

        this.toggleDisablingButton();
        this.isFileFieldValid();
    }
    
    isFileFieldValid = () => {
        if(this.filesMass.length) {
            this.formElementCompleted.files = true;
        } else {
            this.formElementCompleted.files = false;
        }
        this.onFormCompleted();
    }

    isFilesSizeValid = (files) => {
        for (const file of files) {
            if(file.size > this.maxFileSize) return false;
        }
        return true;
    }

    toggleDisablingButton = () => {
        this.filesMass.length === 2 ?
            this.buttonAddFiles.classList.add('disabled') :
            this.buttonAddFiles.classList.remove('disabled');
    }

    createFileItems = (files) => {
        for (const file of files) {
            this.filesMass.push(file);

            const type = this.typeObj[file.type.split('/')[1]];
            const size = Math.ceil(file.size/1024);
            const name = (file.name).replace(`.${type.toLowerCase()}`, '');

            const fileItemWr = document.createElement('div');
            const fileItemText = document.createElement('span');
            const fileItemIcon = document.createElement('span');
            
            fileItemText.textContent = `${type}, ${size} kB`;

            fileItemIcon.classList.add('feedback-form__form__wrapper-files-item-icon');
            fileItemIcon.addEventListener('click', this.deleteElement)

            fileItemWr.textContent = `${name}`;
            fileItemWr.classList.add('feedback-form__form__wrapper-files-item');

            fileItemWr.appendChild(fileItemText);
            fileItemWr.appendChild(fileItemIcon);

            this.wrapperFiles.appendChild(fileItemWr);
        }
    }

    deleteElement = (event) => {
        event.preventDefault();
        const fileName = event.target.parentNode.innerText.split('\n')[0];
        const fileType = event.target.parentNode.innerText.split('\n')[1].split(',')[0].toLowerCase();
        const file = fileName + '.' + fileType;
        this.filesMass = this.filesMass.filter(item => item.name !== file);
        event.target.parentNode.remove();
        
        this.toggleDisablingButton();
        this.isFileFieldValid();
    }

    onCheckboxChange = (event) => {
        this.formElementCompleted.confirm = event.target.checked;
        this.onFormCompleted();
    }

    onFormCompleted = () => {
        if (Object.values(this.formElementCompleted).every(Boolean)) {
            this.buttonSubmit.removeAttribute('disabled');
        } else {
            this.buttonSubmit.setAttribute('disabled', '');
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        const data = {};
        data.email = this.inputEmail.value;
        data.message = this.inputMessage.value;
        data.files = this.filesMass;
        data.confirm = this.checkboxInput.checked;
        const dataJSON = JSON.stringify(data);

        fetch('/form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: dataJSON
        }).then(response => console.log(response))
    }
}

export default FeedbackForm