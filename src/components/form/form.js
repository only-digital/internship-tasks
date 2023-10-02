import Component from '../../app/js/base/Component';

class Form extends Component {
    emailError;
    policyError;
    serverError;
    emailInput;
    policyInput;
    submitButton;
    successButton;
    emailWrapper;
    policyWrapper;

    constructor(element) {
        super(element);

        this.root.addEventListener('submit', this.handleFormSubmit);
        this.policyError = this.getElement('policy-error');
        this.emailError = this.getElement('email-error');
        this.serverError = this.getElement('server-error');
        this.emailInput = this.getElement('email-input');
        this.policyInput = this.getElement('policy-input');
        this.submitButton = this.getElement('submit');
        this.successButton = this.getElement('success');
        this.emailWrapper = this.getElement('email-wrapper');
        this.policyWrapper = this.getElement('policy-wrapper');
        this.emailInput.addEventListener('input',this.handleEmailChange);
        this.policyInput.addEventListener('change',this.handlePolicyChange);
    }

    handleEmailChange = () => {
        this.emailError.classList.add('form_invisible-elem');
    }

    handlePolicyChange = () => {
        this.policyError.classList.add('form_invisible-elem');
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(this.root);
        if (!formData.get('confirm')) {
            if (this.policyError.classList.contains('form_invisible-elem')) {
                this.policyError.classList.remove('form_invisible-elem');
            }
        } else if (formData.get('email').length === 0) {
            if (this.emailError.classList.contains('form_invisible-elem')) {
                this.emailError.classList.remove('form_invisible-elem');
            }
        } else {{
            this.submitData({
                email: formData.get('email'),
                confirm: true,
            })
        }}
    }

    setSuccess = () => {
        this.successButton.classList.remove('form_invisible-elem');
        this.submitButton.classList.add('form_invisible-elem');
        this.emailWrapper.classList.add('form_success');
        this.policyWrapper.classList.add('form_success');
    }

    setError = (errorText) => {
        this.serverError.classList.remove('form_invisible-elem');
        this.serverError.textContent = errorText;
    }

    clearError = () => {
        this.serverError.textContent = '';
        this.serverError.classList.add('form_invisible-elem');
    }

    submitData = async (data) => {
        this.clearError();
        const url = 'http://localhost:3000/form';
        try {
            const response = await fetch(url,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body:JSON.stringify(data)
            });
            console.log(response)
            if (response.ok) {
                this.setSuccess();
            } else this.setError(response.statusText);
        } catch (error) {
            console.error(error);
        }
    }
}

export default Form