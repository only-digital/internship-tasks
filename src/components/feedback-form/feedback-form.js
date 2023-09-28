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
    res;
    resError;
    resSuccess;
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

        this.isChecked = this.checkboxEl.checked;

        this.buttonSubmitEl.classList.add('hidden');
        this.loaderEl.classList.remove('loading');

        this.sendData(this.inputValue,this.isChecked);
    }
    sendData = async(field,isChecked) => {
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
            this.errorReaction(response);
        } else {
            this.successReaction(response);
        }
    }
    successReaction = async(response) => {
        this.res = await response.json();
        this.resSuccess = await this.res.message;
        this.loaderEl.classList.add('loading');
        this.inputEl.classList.add('sent');
        this.checkboxEl.classList.add('sent');
        this.checkboxLabelEl.classList.add('sent');
        this.checkboxLinkEl.classList.add('sent');
        this.errorBlockEl.innerText = '';
        this.errorBlockEl.classList.add('success');
        this.errorBlockEl.innerText = this.resSuccess;
        this.buttonSuccessfulEl.classList.remove('hidden');
        return this.resSuccess
    }
    errorReaction = async(response) => {
        this.res = await response.json();
        this.resError = await this.res.message;
        this.loaderEl.classList.add('loading');
        this.buttonSubmitEl.classList.remove('hidden');
        this.errorBlockEl.innerText = this.resError;
        return this.resError
    }
}

export default FeedbackForm