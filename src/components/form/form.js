import Component from '../../app/js/base/Component';

class Form extends Component {
    constructor(element) {
        super(element);

        this.email = this.getElement('email');
        this.emailName = this.getElement('email-name');

        this.msg = this.getElement('msg');
        this.msgName = this.getElement('msg-name');

        this.email.addEventListener("input", this.emailFocus)
        this.msg.addEventListener("input", this.msgFocus)
    }

    emailFocus = () => {
        if (this.email.value!='') {
            this.email.classList.add('activeEmail');
            this.emailName.classList.remove('hidden');
        }
        else {
            this.email.classList.remove('activeEmail');
            this.emailName.classList.add('hidden')
        }
    }

    msgCalculateHeight = () => {
        this.msg.style.height = "1px";
        this.msg.style.height = (25+this.msg.scrollHeight)+"px";
    }

    msgFocus = () => {

        this.msgCalculateHeight();

        if (this.msg.value!='') {
            this.msg.classList.add('activeMsg');
            this.msgName.classList.remove('hidden');
        }
        else {
            this.msg.classList.remove('activeMsg');
            this.msgName.classList.add('hidden')
        }
    }
}

export default Form