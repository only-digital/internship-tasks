import Component from '../../app/js/base/Component';

class Form extends Component {
    emailInput
    checkboxInput
    form

    constructor(element) {
        super(element);

        const submitButton = this.getElement('submit-button');
        this.emailInput = this.getElement('email__input');
        this.checkboxInput = this.getElement('checkbox__input');
        this.form = this.getElement('form');

        submitButton.onclick = (event) => this.submitForm(event);
        this.emailInput.addEventListener('input', () => this.checkEmailValidity());
        this.checkboxInput.addEventListener('input', () => this.checkCheckboxValidity());

    }

    submitForm(event) {
        event.preventDefault();

        const emailData = this.emailInput.value;
        const confirmed = this.checkboxInput.checked;

        if (this.emailInput.validity.valid && this.checkboxInput.checked) {
            this.form.classList.add('sent');

            fetch('/form', {
                method: 'POST',
                body: JSON.stringify({
                    email: emailData,
                    confirm: confirmed
                })
            })
                .then(response => response.status)
                .then(result => result);
        } else {
            this.checkCheckboxValidity();
            this.checkEmailValidity();
        }
    }

    checkEmailValidity() {
        const emailValidityMessage = this.getElement('email__validity__message');

        if (this.emailInput.validity.typeMismatch) {
            this.setErrorMessage('Email должен содержать символ @', emailValidityMessage)
        } else if (this.emailInput.validity.valueMissing) {
            this.setErrorMessage('Поле email обязательно', emailValidityMessage);
        } else {
            emailValidityMessage.style.visibility = 'hidden';
        }
    }

    checkCheckboxValidity() {
        const checkboxValidityMessage = this.getElement('checkbox__validity__message')

        if (this.checkboxInput.validity.valid) {
            checkboxValidityMessage.style.visibility = 'hidden';
        } else {
            this.setErrorMessage('Необходимо подтверждение', checkboxValidityMessage);
        }
    }

    setErrorMessage(message, errorBlock) {
        errorBlock.style.visibility = 'visible';
        errorBlock.textContent = message;
    }
}

export default Form
