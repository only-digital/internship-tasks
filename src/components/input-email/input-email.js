import Component from '../../app/js/base/Component';

class InputEmail extends Component {
    input;
    error;
    tip;
    constructor(element) {
        super(element);
        this.root = element.component;
        this.input = this.getElement('input');
        this.error = this.getElement('error');
        this.tip = this.getElement('svg');
        this.input.addEventListener('blur',this.handleEmailInput);
        this.input.addEventListener('focus',this.handleEmailFocus);
    }

    showError = (error) =>{
        this.error.classList.remove('input-email_invisible');
        this.input.classList.add('input-email__input_error');
        const prevError = this.error.innerText;
        this.error.innerText = prevError+ ' '+error;
    }

    showTip = () => {
        this.tip.classList.remove('input-email_invisible');
    }

    hideTip = () => {
        if (this.tip.classList.contains('input-email_invisible')) {
            this.tip.classList.add('input-email_invisible');
        }
    }

    setConfirmAttribure = (isConfirmed) => {
        if (isConfirmed) {
            this.root.setAttribute('data-valid','true');
        } else this.root.removeAttribute('data-valid');
    }

    hideError = () => {
        this.error.innerText = '';
        this.error.classList.add('input-email_invisible');
        this.input.classList.remove('input-email__input_error');
    }

    handleEmailInput = (event) => {
        const emailRegExp = /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/;
        if (!emailRegExp.test(event.target.value)) {
            this.showError('Введите email');
            this.hideTip();
            this.setConfirmAttribure(false);
        } else if (event.target.value.length > 255) {
            this.showError('Введите значение менее 255 символов');
            this.hideTip();
            this.setConfirmAttribure(false);
        } else {
            this.hideError();
            this.showTip();
            this.setConfirmAttribure(true);
        }
    }

    handleEmailFocus = () => {
        this.hideError();
    }
}

export default InputEmail