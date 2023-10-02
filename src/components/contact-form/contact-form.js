import Component from '../../app/js/base/Component';

class ContactForm extends Component {
    form
    sendButton
    errorField
    loader

    constructor(element) {
        super(element);


        this.form = document.getElementById('contact-form');
        this.form.addEventListener('submit', this.handleSubmitForm);
        this.sendButton = this.getElement('send-button');

        this.errorField = document.querySelector('.contact-form__error-field');
        this.loader = document.querySelector('.loader');
    }

    launchLoader = () => {
        this.loader.classList.add('active');
    }

    stopLoader = () => {
        this.loader.classList.remove('active');
    }

    handleSubmitForm = async (e) => {
        e.preventDefault();
        this.launchLoader();
    
        const formData = new FormData(this.form, this.sendButton);
        const requestBody = {
            email: formData.get('email'),
            confirm: !!formData.get('agreement'),
        }
  
        const response = await fetch('http://localhost:3000/form', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'content-type': 'application/json',
            }
        });
        const data = await response.json();
        if (data) this.stopLoader()
        if (data.message === 'Данные успешно отправлены') {
            this.errorField = '';
            this.root.classList.add('submitted');
        } else {
            this.errorField.textContent = data.message;
        }
        
    }
}

export default ContactForm