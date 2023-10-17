import Component from '../../app/js/base/Component';

class Form extends Component {

    viewsElement;
    responsesElement;
    formElement;
    buttonElement;
    errorElement;
    successElement;
    loaderElement;
    loaderButtonElement;

    constructor(element) {
        super(element);
        this.formElement = document.querySelector('.form-feedback__form');
        this.errorElement = document.querySelector('.form-feedback__error');
        this.successElement = document.querySelector('.form-feedback__success');
        this.buttonElement = document.querySelector('.form-feedback__submit');
        this.viewsElement = document.querySelector('.form-caption__info__views');
        this.responsesElement = document.querySelector('.form-caption__info__responses');
        this.loaderElement = document.querySelector('.loader-wrapper');
        this.loaderButtonElement = document.querySelector('.loader-wrapper__button');


        this.getStats();

        this.formElement.addEventListener('submit', (event) => { 
          event.preventDefault(); 

          this.buttonElement.style.pointerEvents = 'none';
          this.buttonElement.style.opacity = '0.5';
          this.loaderButtonElement.style.display = 'flex';
          const email = this.formElement.elements.email.value;
          const confirm = this.formElement.elements.checkbox.checked;
          const data = {email, confirm};

          this.submitForm(data);
      });
    }

    async getStats() {
        try {
            const response = await fetch('/stats');
            const data = await response.json();
            this.viewsElement.textContent += data.views; 
            this.responsesElement.textContent += data.responses; 
        } catch (error) {
            console.error(error);
        } finally{
          this.loaderElement.style.display = 'none';
        }
    }

    async submitForm(data) {
        try {
            const response = await fetch('/form', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(data) 
            });

            console.log(response);

            if (response.status === 200) { 
                this.loaderButtonElement.style.display = 'none';
                this.buttonElement.style.display = 'none';
                this.successElement.style.display = 'flex'; 
            } else if (response.status === 422) { 
                this.errorElement.style.display = 'block'; 
                this.loaderButtonElement.style.display = 'none';
                this.buttonElement.style.pointerEvents = 'all';
                this.buttonElement.style.opacity = '1';
            }
        } catch (error) {
            console.error(error);
        }
    }
    
}
export default Form