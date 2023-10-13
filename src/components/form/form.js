import Component from '../../app/js/base/Component';

class Form extends Component {

    serverError;
    policyError;
    policyInput;
    loader;
    submitButton;
    errors;
    inputEmailRoot;
    inputEmail;
    textarea;
    inputFile;
    inputFileWrapper;
    fileError;

    constructor(element) {
        super(element);

        this.root.addEventListener('submit',this.handleFormSubmit);
        this.serverError = this.getElement('server-error');
        this.loader = this.root.querySelector('.loader');
        this.submitButton = this.root.querySelector('.button');
        this.inputEmailRoot = this.root.querySelector('.input-email');
        this.inputEmail = this.inputEmailRoot.querySelector('.input-email__input');
        this.inputEmail.addEventListener('formemail',this.handleEmail);
        this.policyInput = this.root.querySelector('.checkbox__input');
        this.policyInput.addEventListener('formcheckbox',this.handleCheckbox);
        this.policyError = this.root.querySelector('.checkbox__error');
        this.textarea = this.root.querySelector('.textarea__area');
        this.textarea.addEventListener('formtextarea',this.handleTextarea);


        this.inputFile = this.root.querySelector('.input-file__input');
        this.fileError = this.root.querySelector('.form__file-error');
        // this.inputFile.addEventListener('input',this.handleInputFile);
        this.inputFile.addEventListener('formfile',this.handleFile);
        this.inputFileWrapper = this.root.querySelector('.form__input-file-wrapper');


        this.errors = new Map([
                                ['email',  false],
                                ['textarea', false],
                                ['policy', false],
                                ['file', true]
                            ]);
        this.disableSubmitButton();
    }

    handleFile = (event) => {
        const fileIsCorrect = event.detail.file;
        if (fileIsCorrect) {
            this.errors.set('textarea',true);
        } else {
            this.errors.set('textarea',false);
        }
        this.checkErrors();
    }

    handleTextarea = (event) => {
        const textareaIsCorrect = event.detail.textarea;
        if (textareaIsCorrect) {
            this.errors.set('textarea',true);
        } else {
            this.errors.set('textarea',false);
        }
        this.checkErrors();
    }

    handleEmail = (event) => {
        const emailIsCorrect = event.detail.email;
        if (emailIsCorrect) {
            this.errors.set('email',true);
        } else {
            this.errors.set('email',false);
        }
        this.checkErrors();
    }

    handleCheckbox = (event) => {
        if(event.target.checked) {
            this.policyError.classList.add('checkbox_invisible-elem');
            this.errors.set('policy',true);
        } else {
            this.errors.set('policy',false);
            this.policyError.classList.remove('checkbox_invisible-elem');
        }
        this.checkErrors();
    }

    checkErrors = () => {
        let formIsValid = true;
        for (let value of this.errors.values()) {
            if (!value) {
                formIsValid = false;
                break;
            }
        }
        if (formIsValid) {
            this.enableSubmitButton();
        } else this.disableSubmitButton();
    }

    enableSubmitButton = () => {
        this.submitButton.classList.remove('button_disabled');
        this.submitButton.removeAttribute('disabled');
    }

    showLoader = () => {
        this.loader.classList.remove('loader_disabled')
    }

    hideLoader = () => {
        this.loader.classList.add('loader_disabled')
    }

    disableSubmitButton = () => {
        if (!this.submitButton.classList.contains('button_disabled')) {
            this.submitButton.classList.add('button_disabled');
            this.submitButton.setAttribute('disabled', '');
        }
    }

    bytesToKb = (bytes) => {
        return (bytes / 1024).toFixed(1);
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(this.root);
        if (!formData.get('policy')) {
            this.setPolicyError();
        } else {
            this.submitData({
                email: formData.get('email'),
                policy: true,
            })
        }
    }

    setError = (errorText) => {
        this.serverError.classList.remove('form_invisible-elem');
        this.serverError.textContent = errorText;
    }

    clearError = () => {
        this.serverError.textContent = '';
        this.serverError.classList.add('form_invisible-elem');
    }

    setPolicyError = () => {
        this.policyError.classList.remove('form_invisible-elem');
    }

    clearPolicyError = () => {
        this.policyError.classList.add('form_invisible-elem');
    }

    submitData = async (data) => {
        this.clearError();
        const url = 'http://localhost:3000/form';
        try {
            this.showLoader();
            const response = await fetch(url,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body:JSON.stringify(data)
            });
            this.hideLoader();
            if (!response.ok) {
                this.setError(response.statusText);
            } else this.root.reset();
        } catch (error) {
            console.error(error);
        }
    }

}

export default Form