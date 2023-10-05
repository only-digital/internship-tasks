import Component from '../../app/js/base/Component';

class Form extends Component {

    email;
    errorEmail;
    checkbox;   
    submit;
    success;
    
    emailBlock;
    checkboxBlock;
    successText;

    constructor(element) {
        super(element);
        // Your code here
        this.email = document.querySelector('.form__input');
        this.errorEmail = document.querySelector('.form__email-error');
        this.checkbox = document.querySelector('.form__checkbox-input');  
        this.submit = document.querySelector('.form__button-submit');
        this.success = document.querySelector('.form__success-submit');

        this.emailBlock = document.querySelector('.form__email-block');
        this.checkboxBlock = document.querySelector('.form__checkbox-block');
        this.successText = document.querySelector('.form__success-text');

        this.root.addEventListener('submit', this.onSubmit);

         
    }

    onSubmit = (event) => {
        event.preventDefault();

        this.pushForm(this.email.value, this.checkbox.checked);
    }

    pushForm = async (email, confirm) => {
        console.log(confirm)
        try {
            const result = await fetch("/form", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({ email, confirm }),
            });

            const data = await result.json();
            if (result.status === 200) {
                this.submit.classList.add('hidden');
                this.errorEmail.classList.add('hidden');
                this.success.classList.remove('hidden');

                this.emailBlock.classList.add('inactive');
                this.checkboxBlock.classList.add('inactive');
                this.successText.textContent = data.message;

                return;
            } else if (result.status === 422) {
                throw new Error(data.message);
            }
        } catch (error) {
            this.errorEmail.textContent = error.message;
            this.errorEmail.classList.remove('hidden');          
        }
    };


}
    
export default Form