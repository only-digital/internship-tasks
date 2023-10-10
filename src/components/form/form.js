import Component from '../../app/js/base/Component';

const errorsText = {
    server: 'Ошибка сервера',
    validate: 'Ошибка валидации. Введите email корректно.'
}
class Form extends Component {
    controlEl;
    checkedEl;
    submitBtn;
    errorEl;
    successEl;
    preLoaderEl;
    values
    constructor(element) {
        super(element);
        this.values = {
            confirm: false, 
            email: true,
        }
        this.controlEl = this.getElement('control');
        this.checkedEl = this.getElement('input');
        this.submitBtn = this.getElement('submit');
        this.errorEl = this.getElement('error');
        this.successEl = this.getElement('success');
        this.preLoaderEl = this.getElement('preloder');
        this.root.addEventListener('submit', this.handleSubmit)
        this.checkedEl.addEventListener('change', this.handleChecked);
        this.controlEl.addEventListener('input', this.handleInput);
        this.submitBtn.disabled = true;
    }

    handleChecked = (e) => {
        this.values.confirm = e.target.checked;
        this.submitBtn.disabled = !(this.values.confirm && this.values.email);
    }

    handleInput = (e) => {
        this.values.email = e.target.value;
        this.submitBtn.disabled = !(this.values.confirm && this.values.email);
    }

    isEmailValid = (email) => {
        const email_regexp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        return email_regexp.test(email);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.clearError();
    
        if(!this.isEmailValid(this.values.email)){
            this.setError(errorsText.validate);
            return;
        }

        this.showPreloader();
        this.postData(this.values).then((response) => {
            if (response.status === 200) {
                this.setSuccess();
            } else if (response.status === 422) {
                this.setError(errorsText.server);
            }
        })
        .catch(console.log)
        .finally(() => this.hidePreloader()); 
    }

    setError = (text) => {
        this.errorEl.textContent = text;
    }

    showPreloader = () => {
        this.preLoaderEl.classList.add('active');
    }

    hidePreloader = () => {
        this.preLoaderEl.classList.remove('active');
    }

    clearError = () => {
        this.errorEl.textContent = '';
    }

    postData = async (data) => {
        return await fetch('/form',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body:JSON.stringify(data)
        });
    } 

    setSuccess = () => {
        this.root.classList.add('form--success');
        this.submitBtn.classList.add('js-inactive')
        this.successEl.classList.remove('js-inactive');
    }
}

export default Form