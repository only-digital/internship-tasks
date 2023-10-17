import Component from '../../app/js/base/component';

class Email extends Component {
    emailInput;
    constructor(element) {
        super(element);

        this.emailInput = this.getElement('email-input');
        console.log(this.emailInput);
        // Your code here
    }

    // Your code here
}

export default Email