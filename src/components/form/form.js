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

        this.emailInput.addEventListener('input', () => this.checkEmail());
        this.emailInput.addEventListener('blur', () => this.showError(this.emailValid, 'Не валидный адрес email', this.emailInputWrapper, this.emailError));
        this.emailInput.addEventListener('focus', () => this.hideError(this.emailError, this.emailInputWrapper));

        this.messageInput.addEventListener('input', () => this.checkMessage());
        this.messageInput.addEventListener('blur', () => this.showError(this.messageValid, 'Заполните это поле', this.messageInputWrapper, this.messageError));
        this.messageInput.addEventListener('focus', () => this.hideError(this.messageError, this.messageInputWrapper));
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
}

export default Form
