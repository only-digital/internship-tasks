import Component from '../../app/js/base/Component';

class Form extends Component {
    from;
    inputText;
    inputCheckbox;
    formError;
    formSuccess;
    constructor(element) {
        super(element);
        this.form = element.component
        this.inputText = this.form.querySelector('.form__input-text')
        this.inputCheckbox = this.form.querySelector('.form__input-checkbox')
        this.formError = this.form.querySelector('.form__error')
        this.formSuccess = this.form.querySelector('.form__success')
        this.form.addEventListener('submit', this.onSubmit)
    }

    onSubmit = (e) =>{
        e.preventDefault();
        this.formError.textContent = ''
        const newSub = {
            email: this.inputText.value,
            confirm: this.inputCheckbox.checked
        }
        fetch('http://localhost:3000/form',{
            method: 'POST',
            body: JSON.stringify(newSub),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then((response)=> {
                if(response.status === 422) {
                    response.json()
                        .then((data) => this.errorMessage(data))
                    throw new Error('error')
                }
                return response.json();
            })
            .then((data) => this.successMessage(data))
            .catch((err)=> console.log(err))
    }

    errorMessage = ({message}) => {
        this.formError.textContent = message;
    }
    successMessage = (message) => {
        this.form.classList.add('form__disabled')
        this.inputCheckbox.disabled=true;
        this.inputText.disabled=true;
        this.formSuccess.innerHTML += message.message;
    }

}

export default Form
