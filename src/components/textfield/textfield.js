import Component from '../../app/js/base/component';

class Textfield extends Component {
    textfield;
    input;

    constructor(element) {
        super(element);
        // how to select a whole component itself??
        this.textfield = this.getElement('');
        console.log('this is' + this.textfield);
        this.input = this.getElement('input');
        console.log(this.input, this.input.value);
        // Your code here
        this.input.addEventListener('input', this.handleInput)
    }

    handleInput = () => {
        console.log('inputing!!!')
        console.log("Textarea value changed: " + this.input.value);
        if (this.input.value.length > 10) {
            this.classList.add('filled');
            console.log('filled');
        }
    }    // Your code here
}

export default Textfield