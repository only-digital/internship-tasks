import Component from '../../app/js/base/Component';

class Form extends Component {
    emailInput
    emailCaption

    constructor(element) {
        super(element);

        this.emailInput = this.getElement('email-input');
        this.emailCaption = this.getElement('email-label');
        this.emailInput.addEventListener('input', () => {this.checkEmail()})
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
}

export default Form
