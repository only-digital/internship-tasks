import Component from '../../app/js/base/component';

class Form extends Component {
    inputs;
    emailErrorText;
    tooltips;

    constructor(element) {
        super(element);

        this.emailErrorText = this.getElement('email-error-text')
        this.inputs = this.root.querySelectorAll('.form__input')
        this.tooltips = this.root.querySelectorAll('.form__input-text')

        this.inputs.forEach(input => {
            input.addEventListener('change', this.changeHandler)
            input.addEventListener('input', this.inputHandler)
        })
    }

    changeHandler = ({ target }) => {
        if (target.hasAttribute('data-reg')) {
            this.regCheck(target)
        }
    }

    inputHandler = ( { target } ) => {
        this.clearStatus(target)
        this.showTooltip(target)
        this.limitInput(target)
    }

    regCheck = (input) => {
        const inputValue = input.value
        const inputReg = input.getAttribute('data-reg')
        const reg = new RegExp(inputReg)
        
        if (inputValue !== '') {
            if (!reg.test(inputValue)) {
                this.showError(input)
            } else {
                this.showSuccess(input)
            }
        }
    }

    showTooltip = (input) => {
        if (input.value) {
            input.nextSibling.classList.add('form__input-text--shown')
        } else {
            input.nextSibling.classList.remove('form__input-text--shown')
        }
    }
    
    showError = (input) => {
        this.emailErrorText.textContent = 'Неправильный формат'
        input.classList.add('input--error')
    }

    clearStatus = (input) => {
        this.emailErrorText.textContent = ''
        input.classList.remove('input--error')
        input.classList.remove('input--success')
    }

    showSuccess = (input) => {
        input.classList.add('input--success')
    }

    limitInput = (input) => {
        if (input.value.length >= 255) {
            input.value = input.value.substr(0, 255)
        }
    }
}

export default Form