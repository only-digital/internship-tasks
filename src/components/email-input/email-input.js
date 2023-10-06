import Component from '../../app/js/base/Component';
import validateForm from '../../helpers/validateForm';

class EmailInput extends Component {
    inputElement
    errorField
    submitButton

    constructor(element) {
        super(element);

        this.inputElement = document.getElementById('email');
        this.inputElement.addEventListener('input', this.removeErrorMessage);
        this.inputElement.addEventListener('blur', this.validateEmailInput);

        this.errorField = this.getElement('error-field');

        this.submitButton = document.querySelector('.submit-button');
    }

    fixLabelPosition = (value) => {
        if (value.length !== 0) {
            this.root.classList.add('filled');
        } else {
            this.root.classList.remove('filled');
        }
    }

    removeErrorMessage = () => {
        this.root.classList.remove('invalid');
        this.errorField.textContent = '';
    }

    validateEmailInput = (e) => {
        this.root.classList.remove('valid');

        const inputValue = e.target.value;
        this.fixLabelPosition(inputValue);
        const validPattern = /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/;
        if (inputValue.length === 0) {
            this.errorField.textContent = 'Обязательное поле';
            this.root.classList.add('invalid');
        } else if (inputValue.length > 255) {
            this.errorField.textContent = 'Слишком длинная запись';
            this.root.classList.add('invalid');
        } else if (!inputValue.match(validPattern)) {
            this.errorField.textContent = 'Некорректный адрес';
            this.root.classList.add('invalid');
        } else {
            this.root.classList.remove('invalid');
            this.root.classList.add('valid');
        }
        validateForm();
    }
}

export default EmailInput