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
        

        this.input.addEventListener('input', this.handleInput);
        
    }

    handleInput = () => {
        console.log('inputing' + this.input.value);
        if (this.emailRegex.test(this.input.value)) {
            // Valid email address
            console.log('valid')
            this.root.classList.add('valid');
            this.root.classList.remove('invalid');
            this.span.innerText = ''
        } else {
            // Invalid email address
            console.log('invalid at all!!!')
            this.root.classList.remove('valid');
            this.root.classList.add('invalid');
            this.span.innerText = 'this is just bad email'

        }
}
}

export default Email