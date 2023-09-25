import Component from '../../app/js/base/Component';

class FeedbackForm extends Component {
    URL;
    inputEl;
    inputValue;
    checkboxEl;
    checkboxLabelEl;
    checkboxLinkEl;
    buttonSubmitEl;
    formEl;
    isChecked;
    errorBlockEl;
    buttonSuccessfulEl;
    loaderEl;
    constructor(element) {
        super(element);

        this.URL = '/form';
        this.checkboxEl = this.getElement('checkbox-item');
        this.buttonSubmitEl = this.getElement('button');
        this.checkboxLabelEl = this.getElement('checkbox-name');
        this.checkboxLinkEl = this.checkboxLabelEl.firstElementChild;
        this.formEl = this.getElement('form');
        this.inputEl = this.getElement('field');
        this.errorBlockEl = this.getElement('message');
        this.buttonSuccessfulEl = this.getElement('button-successful');
        this.loaderEl = this.getElement('loader');

        this.formEl.addEventListener('submit', this.submitForm);
    }

    submitForm = (e) => {
        e.preventDefault();
        this.inputValue = this.inputEl.value;
        this.checkboxEl = this.getElement('checkbox-item');

        this.checkboxEl.checked ? this.isChecked = true : this.isChecked = false;

        this.buttonSubmitEl.classList.add('hidden');
        this.loaderEl.classList.remove('loading');

        this.sendData(this.inputValue,this.isChecked);
    }
    sendData = async(field,isChecked) => {
        let res, resError, resSuccess;
        let response = await fetch(this.URL, {
            method: 'POST',
            body: JSON.stringify({
                email: field,
                confirm: isChecked,
            }),
            headers: {
                'content-type': 'application/json',
            }
        });

        if (response.status === 422) {
            res = await response.json();
            resError = await res.message;

            setTimeout(() => {
                this.loaderEl.classList.add('loading');
                this.buttonSubmitEl.classList.remove('hidden');
            }, 5000);

            this.errorBlockEl.innerText = resError;
            return resError

        } else {
            res = await response.json();
            resSuccess = await res.message;

            setTimeout(() => {
                this.loaderEl.classList.add('loading');
                this.inputEl.classList.add('sent');
                this.checkboxEl.classList.add('sent');
                this.checkboxLabelEl.classList.add('sent');
                this.checkboxLinkEl.classList.add('sent');
                this.errorBlockEl.innerText = '';
            }, 5000);

            this.errorBlockEl.classList.add('success');
            this.errorBlockEl.innerText = resSuccess;
            this.buttonSuccessfulEl.classList.remove('hidden');
            return resSuccess
        }
    }
}

export default FeedbackForm