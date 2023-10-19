import Component from '../../app/js/base/component';

class FeedbackForm extends Component {
    button;
    confirmLink;
    confirmLabel;
    confirmInput;
    emailInput;
    textfield;
    textfieldInput;

    constructor(element) {
        super(element);
      
        this.root.addEventListener('submit', (e) => this.handleSubmit(e))
        // Your code here
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log('submiting!!')
        this.confirmLink = document.querySelector('.confirm__link');
        this.confirmLabel = document.querySelector('.confirm__label');
        this.confirmInput = document.querySelector('.confirm__input');
        this.emailInput = document.querySelector('.email__input');
        this.textfieldInput = document.querySelector('.textfield__input');
        this.textfield = document.querySelector('.textfield');
        console.log(this.confirmLink, this.confirmLabel, this.emailInput);
        this.confirmLink.classList.add('disabled');
        this.confirmLabel.classList.add('disabled');
        this.confirmInput.disabled = true;
        this.emailInput.disabled = true;
        this.textfield.classList.add('disabled');
        this.textfieldInput.disabled = true;
    }
    // Your code here
}

export default FeedbackForm