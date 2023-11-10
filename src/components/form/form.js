import Component from '../../app/js/base/Component';

class Form extends Component {
    emailInput
    emailLabel
    emailInputWrapper
    emailError
    emailValid

    messageInput
    messageInputWrapper
    messageError
    messageCheckmark
    messageLabel
    messageValid

    fileInput
    chosenFile
    fileName
    fileData
    removeFileButton

    checkboxInput
    checkboxError

    submitButton
    form

    constructor(element) {
        super(element);

        this.emailInput = this.getElement('email-input');
        this.emailLabel = this.getElement('email-label');
        this.emailInputWrapper = this.getElement('email-input-wrapper');
        this.emailError = this.getElement('email-error');
        this.messageInput = this.getElement('message-input');
        this.messageInputWrapper = this.getElement('message-input-wrapper');
        this.messageError = this.getElement('message-error');
        this.messageCheckmark = this.getElement('message-checkmark');
        this.messageLabel = this.getElement('message-label');
        this.fileInput = this.getElement('file-input');
        this.chosenFile = this.getElement('chosen-file');
        this.fileName = this.getElement('file-name');
        this.fileData = this.getElement('file-data');
        this.removeFileButton = this.getElement('remove-file-button');
        this.checkboxInput = this.getElement('checkbox-input');
        this.checkboxError = this.getElement('checkbox-error');
        this.submitButton = this.getElement('submit-button');
        this.form = this.getElement('form');

        this.emailInput.addEventListener('input', () => this.checkEmail());
        this.emailInput.addEventListener('blur', () => this.showError(this.emailValid, 'Не валидный адрес email', this.emailInputWrapper, this.emailError));
        this.emailInput.addEventListener('focus', () => this.hideError(this.emailError, this.emailInputWrapper));

        this.messageInput.addEventListener('input', () => this.checkMessage());
        this.messageInput.addEventListener('blur', () => this.showError(this.messageValid, 'Заполните это поле', this.messageInputWrapper, this.messageError));
        this.messageInput.addEventListener('focus', () => this.hideError(this.messageError, this.messageInputWrapper));

        this.fileInput.addEventListener('change', () => this.inputFile());
        this.removeFileButton.addEventListener('click', () => this.removeFile());

        this.checkboxInput.addEventListener('change', () => this.checkConfirmation());

        this.form.addEventListener('change', () => this.checkForm());

        this.submitButton.addEventListener('click', (event) => this.submitForm(event));
    }

    checkEmail() {
        const emailCheckExpression = /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/;
        this.emailValid = emailCheckExpression.test(this.emailInput.value);

        if (this.emailInput.value.length > 0) {
            this.emailLabel.textContent = 'E-mail';
        } else {
            this.emailLabel.textContent = '';
        }

        if (this.emailValid) {
            this.emailInputWrapper.classList.add('filled');
        } else {
            this.emailInputWrapper.classList.remove('filled');
        }
    }

    checkMessage() {
        this.messageValid = this.messageInput.validity.valid;

        if (this.messageInput.value.length > 0) {
            this.messageLabel.textContent = 'Ваше сообщение';
            this.messageInputWrapper.classList.add('filled');
        } else {
            this.messageLabel.textContent = '';
            this.messageInputWrapper.classList.remove('filled');
        }
    }

    showError(isValid, validityMessage, input, error) {
        let message;
        if (isValid) {
            message = '';
            input.classList.remove('invalid');
        } else {
            message = validityMessage;
            input.classList.add('invalid');
        }
        error.textContent = message;
    }

    hideError(error, input) {
        error.textContent = '';
        input.classList.remove('invalid');
    }

    inputFile() {
        let fileName = this.fileInput.files[0].name;
        const fileExtension = fileName.split('.').pop().toUpperCase();
        const fileData = ` ${fileExtension}, ${this.fileInput.files[0].size/1000} kB`;
        fileName = fileName.replace(/\.(pdf|docx?)/i, '');

        this.fileName.textContent = fileName;
        this.fileData.textContent = fileData;
        this.chosenFile.classList.add('shown');
    }

    removeFile() {
        this.fileInput.value = '';
        this.chosenFile.classList.remove('shown');
    }

    checkConfirmation() {
        if (this.checkboxInput.checked) {
            this.checkboxError.classList.remove('shown');
        } else {
            this.checkboxError.classList.add('shown');
        }
    }

    checkForm() {
        this.submitButton.disabled = !(this.emailValid && this.messageValid && this.checkboxInput.checked);
    }

    submitForm(event) {
        event.preventDefault();

        const emailData = this.emailInput.value;
        const messageData = this.messageInput.value;
        const fileData = JSON.stringify(this.fileInput.files[0]);
        const conditionsConfirmed = this.checkboxInput.checked;

        if (this.emailValid && this.messageValid && conditionsConfirmed) {
            fetch('/form', {
                method: 'POST',
                body: JSON.stringify({
                    email: emailData,
                    message: messageData,
                    file: fileData,
                    confirm: conditionsConfirmed
                })
            })
                .then(response => response)
                .then(result => console.log(result))
        }
    }
}

export default Form
