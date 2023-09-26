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
    fieldNameEl;
    constructor(element) {
        super(element);

        this.URL = '/form';
        this.checkboxEl = this.getElement('checkbox-item');
        this.fieldNameEl = this.getElement('name');
        this.buttonSubmitEl = this.getElement('button');
        this.checkboxLabelEl = this.getElement('checkbox-name');
        this.checkboxLinkEl = this.checkboxLabelEl.firstElementChild;
        this.formEl = this.getElement('form');
        this.inputEl = this.getElement('field');
        this.errorBlockEl = this.getElement('message');
        this.buttonSuccessfulEl = this.getElement('button-successful');
        this.loaderEl = this.getElement('loader');

        // this.inputEl.addEventListener('focus', (e) => {
        //     {
        //         console.log('focus')
        //         this.fieldNameEl.style.marginLeft = '20px'
        //     }
        // })
        // this.inputEl.addEventListener('blur', (e) => {
        //     {
        //         console.log('blur')
        //         this.fieldNameEl.style.marginLeft = '0px'
        //     }
        // })

        this.formEl.addEventListener('submit', this.submitForm);
    }

    submitForm = (e) => {
        e.preventDefault();
        this.inputValue = this.inputEl.value;
        this.checkboxEl = this.getElement('checkbox-item');

        this.checkboxEl.checked ? this.isChecked = true : this.isChecked = false;

        // this.buttonSubmitEl.classList.add('hidden');

        console.log('button pushed')

        fetch(this.URL, {
            method: 'POST',
            body: JSON.stringify({
                email: this.inputValue,
                confirm: this.isChecked,
            }),
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(response => console.log(response))
    }
}

export default FeedbackForm