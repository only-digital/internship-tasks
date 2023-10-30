import Component from '../../app/js/base/component';

class Textfield extends Component {
    input;
    span;

    constructor(element) {
        super(element);
        // how to select a whole component itself??
       
        this.input = this.getElement('input');
        this.span = this.getElement('span');
        // Your code here
        this.input.addEventListener('blur', this.handleBlur);
        this.input.addEventListener('input', this.handleInput);
    }

    handleBlur = () => {
        if (this.input.value.length >= 10 && !this.root.classList.contains('filled')) {
            this.root.classList.add('filled');
            this.root.setAttribute('data-valid', 'true');
            this.span.innerText = '';
        } else if (this.input.value.length < 10) {
            this.root.classList.remove('filled');
            this.span.innerText = 'Сообщение ошибки';
            this.root.removeAttribute('data-valid');
        }
    }  
    handleInput = () => {
        this.span.innerText = '';
        this.root.classList.remove('filled');
    }  
}

export default Textfield