import Component from '../../app/js/base/Component';

class Form extends Component {
    emailError;
    policyError;
    emailInput;
    policyInput;

    constructor(element) {
        super(element);

        this.root.addEventListener('submit', this.handleFormSubmit);
        this.policyError = this.getElement('policy-error');
        this.emailError = this.getElement('email-error');
        this.emailInput = this.getElement('email-input');
        this.policyInput = this.getElement('policy-input');
        this.emailInput.addEventListener('input',this.handleEmailChange);
        this.policyInput.addEventListener('change',this.handlePolicyChange);
    }

    handleEmailChange = () => {
        this.emailError.classList.remove('form__error_visible');
    }

    handlePolicyChange = () => {
        console.log('inside chnage');
        this.policyError.classList.remove('form__error_visible');
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(this.root);
        if (!formData.get('confirm')) {
            if (!this.policyError.classList.contains('form__error_visible')) {
                this.policyError.classList.add('form__error_visible');
            }
        }
        if (formData.get('email').length === 0) {
            if (!this.emailError.classList.contains('form__error_visible')) {
                this.emailError.classList.add('form__error_visible');
            }
        }
    }
}

export default Form