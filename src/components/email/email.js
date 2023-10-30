import Component from '../../app/js/base/component';

class Email extends Component {
    input;
    emailRegex;
    span;
    constructor(element) {
        super(element);

        this.span = this.getElement('span');
        this.input = this.getElement('input');
        this.emailRegex = /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/;
        this.input.addEventListener('blur', this.handleBlur);
        this.input.addEventListener('input', this.handleInput);
        
    }

    handleBlur = () => {
        console.log('bluring' + this.input.value);
        if (this.emailRegex.test(this.input.value)) {
            // Valid email address
            console.log('valid')
            this.root.classList.add('valid');
            this.root.classList.remove('invalid');
            this.root.setAttribute('data-valid', 'true');
            this.span.innerText = ''
            this.isValid = true;
        } else {
            // Invalid email address
            console.log('invalid at all!!!')
            this.root.classList.remove('valid');
            this.root.classList.add('invalid');
            this.root.removeAttribute('data-valid');
            this.span.innerText = 'Сообщение ошибки'
            this.isValid = false;
        }
    }   
    handleInput = () => {
        console.log('inputing' + this.input.value);
        this.root.classList.remove('valid');
        this.root.classList.remove('invalid');
        this.span.innerText = ''
    }

    validation = () => {
        if (this.isValid) {
            return true;
        } else {
            return false;
        }
    }
}

export default Email