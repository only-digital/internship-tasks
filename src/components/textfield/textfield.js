import Component from '../../app/js/base/component';

class Textfield extends Component {
    textfield;
    input;

    constructor(element) {
        super(element);
        // how to select a whole component itself??
       
        console.log('this is ' + this.root.outerHTML);
        this.input = this.getElement('input');
        console.log(this.input, this.input.value);
        // Your code here
        this.input.addEventListener('input', this.handleInput)
    }

    handleInput = () => {
        if (this.input.value.length >= 10 && !this.root.classList.contains('filled')) {
            this.root.classList.add('filled');
        } else if (this.input.value.length < 10 && this.root.classList.contains('filled')) {
            this.root.classList.remove('filled');
        }
    }    
}

export default Textfield