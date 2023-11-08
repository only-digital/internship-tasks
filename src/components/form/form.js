import Component from '../../app/js/base/Component';

class Form extends Component {
    emailInput
    emailCaption
    messageInput
    messageInputWrapper
    messageError
    messageCheckmark
    messageLabel

    constructor(element) {
        super(element);

        this.emailInput = this.getElement('email-input');
        this.emailCaption = this.getElement('email-label');
        this.messageInput = this.getElement('message-input');
        this.messageInputWrapper = this.getElement('message-input-wrapper');
        this.messageError = this.getElement('message-error');
        this.messageCheckmark = this.getElement('message-checkmark');
        this.messageLabel = this.getElement('message-label');

        this.emailInput.addEventListener('input', () => this.checkEmail());
        this.messageInput.addEventListener('blur', () => this.checkMessageValidity());
        this.messageInput.addEventListener('focus', () => {
            this.messageError.textContent = '';
            this.messageInputWrapper.classList.remove('invalid');
        });
        this.messageInput.addEventListener('input', () => this.checkMessageFill());
    }

    checkEmail() {
        const emailCheckExpression = /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/;
        const errorMessage = this.getElement('email-error');
        const isValid = emailCheckExpression.test(this.emailInput.value);
        let message;

        if (this.emailInput.value.length > 0) {
            this.emailCaption.textContent = 'E-mail';
        } else {
            this.emailCaption.textContent = '';
        }

        if (!isValid) {
            message = 'Не валидный адрес email';
            this.emailInput.classList.add('invalid');
            this.emailInput.classList.remove('filled');
        } else {
            message = '';
            this.emailInput.classList.remove('invalid');
            this.emailInput.classList.add('filled');
        }
        errorMessage.textContent = message;
    }

    checkMessageValidity() {
        if (this.messageInput.validity.valid) {
            this.messageError.textContent = '';
            this.messageInputWrapper.classList.remove('invalid');
        } else if (this.messageInput.validity.valueMissing) {
            this.messageError.textContent = 'Необходимо заполнить это поле';
            this.messageInputWrapper.classList.add('invalid');
        } else if (this.messageInput.validity.tooLong) {
            this.messageError.textContent = 'Длина сообщения не дрожна превышать 1000 символов';
            this.messageInputWrapper.classList.add('invalid');
        }
    }

    checkMessageFill() {
        if (this.messageInput.value.length > 0) {
            this.messageInputWrapper.classList.add('filled');
            this.messageCheckmark.classList.add('shown');
            this.messageLabel.textContent = 'Ваше сообщение';
        } else {
            this.messageInputWrapper.classList.remove('filled');
            this.messageCheckmark.classList.remove('shown');
            this.messageLabel.textContent = '';
        }
    }
}

export default Form
