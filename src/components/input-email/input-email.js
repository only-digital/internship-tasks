import Component from '../../app/js/base/Component';

class InputEmail extends Component {
    inputEmail;
    errorEmail;

    constructor(element) {
        super(element);
        this.eventName = this.root.dataset.event;
        this.inputEmail = this.getElement('input');
        this.errorEmail = this.getElement('error');
        this.tipEmail = this.getElement('svg');
        this.inputEmail.addEventListener('input',this.handleEmailInput);
        this.inputEmail.addEventListener('focus',this.handleEmailFocus);
    }

    handleEmailInput = (event) => {
        const emailRegExp = /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/;
        if (!emailRegExp.test(event.target.value)) {
            this.showEmailError('Введите email');
            this.hideEmailTip();
            this.inputEmail.dispatchEvent(new CustomEvent(this.eventName,{
                detail:{
                    email:false
                }
            }));
        } else if (event.target.value.length > 255) {
            this.showEmailError('Введите значение менее 255 символов');
            this.hideEmailTip();
            this.inputEmail.dispatchEvent(new CustomEvent(this.eventName,{
                detail:{
                    email:false
                }
            }));
        } else {
            this.hideEmailError();
            this.showEmailTip();
            this.inputEmail.dispatchEvent(new CustomEvent(this.eventName,{
                detail:{
                    email:true
                }
            }));
        }
    }

    handleEmailFocus = () => {
        this.hideEmailError();
    }

    hideEmailError = () => {
        this.errorEmail.innerText = '';
        this.errorEmail.classList.add('input-email_invisible');
        this.inputEmail.classList.remove('input-email__input_error');
    }

    showEmailError = (error) =>{
        this.errorEmail.classList.remove('input-email_invisible');
        this.inputEmail.classList.add('input-email__input_error');
        const prevError = this.errorEmail.innerText;
        if (!prevError.includes(error)) {
            this.errorEmail.innerText = prevError + ' ' + error;
        }
    }

    showEmailTip = () => {
        this.tipEmail.classList.remove('input-email_invisible');
    }

    hideEmailTip = () => {
        if (!this.tipEmail.classList.contains('input-email_invisible')) {
            this.tipEmail.classList.add('input-email_invisible');
        }
    }

}

export default InputEmail