import Component from '../../app/js/base/Component';

class Form extends Component {
    constructor(element) {
        super(element);

        this.email = this.getElement('email');
        this.emailName = this.getElement('email-name');

        this.email.addEventListener("input", this.emailFocus)
        //this.email.addEventListener("keyup", this.emailFocus)
    }

    emailFocus = () => {
        if (this.email.value!='') {
            this.email.classList.add('active');
            this.emailName.classList.remove('hidden');
        }
        else {
            this.email.classList.remove('active');
            this.emailName.classList.add('hidden')
        }
    }
}

export default Form