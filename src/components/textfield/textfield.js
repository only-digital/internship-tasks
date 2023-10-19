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
        console.log('inputing!!!')
        console.log("Textarea value changed: " + this.input.value);
        if (this.input.value.length >= 10 && !this.root.classList.contains('filled')) {
            this.root.classList.add('filled');
            console.log('filled');
        } else if (this.input.value.length < 10 && this.root.classList.contains('filled')) {
            this.root.classList.remove('filled');
        }
    }    // Your code here
}

export default Textfield