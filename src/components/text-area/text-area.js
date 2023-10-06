import Component from '../../app/js/base/Component';
import validateForm from '../../helpers/validateForm';

class TextArea extends Component {
    inputElement
    errorField
    submitButton

    constructor(element) {
        super(element);

        this.inputElement = document.getElementById('message');
        this.inputElement.addEventListener('input', this.removeErrorMessage);
        this.inputElement.addEventListener('blur', this.validateMessageInput);

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

    validateMessageInput = (e) => {
        this.root.classList.remove('valid');
        const inputValue = e.target.value;
        this.fixLabelPosition(inputValue);
        if (inputValue.length === 0) {
            this.errorField.textContent = 'Обязательное поле';
            this.root.classList.add('invalid');
        } else if (inputValue.length > 1000) {
            this.errorField.textContent = 'Слишком длинная запись';
            this.root.classList.add('invalid');
        } else {
            this.root.classList.remove('invalid');
            this.root.classList.add('valid');
        }
        validateForm()
    }
}

export default TextArea