import Component from '../../app/js/base/Component';

const errorsText = {
    email: 'Поле E-mail обязательно',
    confirm: 'Необходимо согласится с условиями',
}
class Form extends Component {
    controlEl;
    checkedEl;
    submitBtn;
    errorEl;
    successEl;
    constructor(element) {
        super(element);
        this.controlEl = this.getElement('control');
        this.checkedEl = this.getElement('input');
        this.submitBtn = this.getElement('submit');
        this.errorEl = this.getElement('error');
        this.successEl = this.getElement('success');
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

        this.postData(values); 
    }

    setError = (text) => {
        this.errorEl.textContent = text;
    }

    clearError = () => {
        this.errorEl.textContent = '';
    }

    postData = async (data) => {
        const response = await fetch('/form',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body:JSON.stringify(data)
        });
        if (response.ok) {
            this.setSuccess();
        } else this.setError(response.statusText);
    } 

    setSuccess = () => {
        this.root.classList.add('form--success');
        this.submitBtn.classList.add('js-inactive')
        this.successEl.classList.remove('js-inactive');
    }
}

export default Form