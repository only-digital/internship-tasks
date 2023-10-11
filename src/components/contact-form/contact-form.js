import Component from '../../app/js/base/component';

class ContactForm extends Component {
    constructor(element) {
        super(element);

        this.state = {
            email: false,
            message: false
        }

        // Email input
        this.email = document.querySelector('.contact-form__email-input');
        this.email.addEventListener('blur', (e) => this.validationEmailInput(e));
        this.email.addEventListener('input', () => this.changeInputValue(this.emailError));
        this.email.addEventListener('focus', (e) => this.focusInput(e, this.emailImg));
        this.emailText = document.querySelector('.contact-form__email-text');
        this.emailError = document.querySelector('.contact-form__email-error');
        this.emailImg = document.querySelector('.contact-form__email-img');

        // Message input
        this.message = document.querySelector('.contact-form__message-input');
        this.message.addEventListener('blur', (e) => this.validationMessageInput(e));
        this.message.addEventListener('input', () => this.changeInputValue(this.messageError));
        this.message.addEventListener('focus', (e) => this.focusInput(e, this.messageImg));
        this.messageText = document.querySelector('.contact-form__message-text');
        this.messageError = document.querySelector('.contact-form__message-error');
        this.messageImg = document.querySelector('.contact-form__message-img');
    }

    changeInputValue(errorClass) {
        console.log('input');
        errorClass.style.opacity = '0';
    }

    focusInput(e, img) {
        console.log('focus');

        if (e.target.nodeName === 'INPUT') {
            e.target.style.cssText = `
                padding: 0 20px;
                border-radius: 24px;
                border-color: #0041A0;
                background-color: #fff;
            `;

            img.style.opacity = '0';
        } else {
            e.target.style.cssText = `
                padding: 12px 20px 16px 20px;
                background-color: #fff;
                border-color: #0041A0;
            `;
            img.style.opacity = '0';
        }

        
    }

    // Email input
    validationEmailInput(e) {
        console.log('blur email');
        let value = e.target.value;

        if (/^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/.test(value) && value.length && value.length <= 255) {
            console.log('true');
            this.emailText.style.opacity = '1';
            this.email.style.cssText = `
                border-radius: 24px;
                background-color: #F4F4F4;
                padding: 0 20px;
                border-bottom: 1px solid transparent;
            `;
            this.emailImg.style.opacity = '1';
            this.state.email = true;
        } else {
            console.log('не правда')
            if (value.length === 0) {
                this.emailError.textContent = "Поле 'E-mail' обязательно";
            } else if (value.length > 255) {
                this.emailError.textContent = "Поле 'E-mail' не более 255 символов";
            } else {
                this.emailError.textContent = "Не верный формат 'E-mail'";
            }

            this.emailText.style.opacity = '1';
            this.email.style.cssText = `
                border: 1px solid #FF0000;
                border-radius: 24px;
                background-color: #fff;
                padding: 0 20px;
            `;
            this.emailError.style.opacity = '1';
            this.emailImg.style.opacity = '0';
            this.state.email = false;
        }

        console.log(`State Email: ${this.state.email}`);
    }

    // Message input
    validationMessageInput(e) {
        console.log('blur textarea');
        const value = e.target.value;

        if (value.length > 0 && value.length <= 1000) {
            this.messageText.style.opacity = '1';
            this.message.style.cssText = `
                border: 1px solid transparent;
                padding: 12px 20px 16px 20px;
                border-radius: 24px;
                background-color: #F4F4F4;
                height: 193px;
            `;
            this.messageImg.style.opacity = '1';
            this.state.message = true;
        } else {
            if (value.length > 1000) {
                this.messageError.textContent = "Поле 'Ваше сообщение' не более 1000 символовв"    
            } else {
                this.messageError.textContent = "Поле 'Ваше сообщение' обязательно";
            }
            this.messageText.style.opacity = '1';
            this.message.style.cssText = `
                border: 1px solid #FF0000;
                border-radius: 24px;
                padding: 12px 20px 16px 20px;
                background-color: #fff;
                height: 193px;
            `;
            this.messageError.style.opacity = '1';
            this.state.message = false;
        }

        console.log(`State Text: ${this.state.message}`);
    }
}

export default ContactForm