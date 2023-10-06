import Component from '../../app/js/base/Component';

const errorsText = {
    email: 'Поле E-mail обязательно',
    confirm: 'Необходимо согласится с условиями',
    server: 'Ошибка сервера'
}
class Form extends Component {
    controlEl;
    checkedEl;
    submitBtn;
    errorEl;
    successEl;
    preLoaderEl;
    constructor(element) {
        super(element);
        this.controlEl = this.getElement('control');
        this.checkedEl = this.getElement('input');
        this.submitBtn = this.getElement('submit');
        this.errorEl = this.getElement('error');
        this.successEl = this.getElement('success');
        this.preLoaderEl = this.getElement('preloder');
        this.root.addEventListener('submit', this.handleSubmit)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.clearError();
        const formData = new FormData(e.target);
        const values = Object.fromEntries(formData);
        if(!values.email){
            this.setError(errorsText.email);
            return;
        }

        if(!values.confirm){
            this.setError(errorsText.confirm);
            return;
        }

        this.showPreloader();
        this.postData(values).then((response) => {
            if (response.status === 200) {
                this.setSuccess();
            } else if (response.status === 422) {
                this.setError(errorsText.server);
            }
        }).finally(() => this.hidePreloader()); 
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