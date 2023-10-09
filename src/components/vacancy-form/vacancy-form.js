import Component from '../../app/js/base/component';

class VacancyForm extends Component {
    button;
    views;
    responses;
    emailInput;
    privacyPolicyCheck;
    emailError;
    privacyPolicyError;
    privacyCheckFlexContainer;
    successfulSubmit;
    buttonSVG;
    successfulSubmitSVG;
    buttonText;
    formWrapper;
    loader;

    constructor(element) {
        super(element);

        this.button = this.getElement('submit-btn');

        this.views = this.getElement('views');
        this.responses = this.getElement('responses');

        this.emailInput = this.getElement('email-input');
        this.privacyPolicyCheck = this.getElement('privacy-policy-check');

        this.emailError = this.getElement('email-error');
        this.privacyPolicyError = this.getElement('privacy-policy-error');
        this.privacyCheckFlexContainer = this.getElement('flex-container');

        this.successfulSubmit = this.getElement('successful-submit');
        this.buttonSVG = this.getElement('button-svg');
        this.successfulSubmitSVG = this.getElement('successful-submit-svg');
        this.buttonText = this.getElement('btn-text');

        this.formWrapper = this.getElement('form-wrapper');

        this.loader = this.getElement('loader');

        this.button.addEventListener('click', this.onButtonCLick);

        fetch('./stats')
            .then(res => res.json())
            .then(data => {
                this.views.innerText = `Просмотров: ${data['views']}`;
                this.responses.innerText = `Откликов: ${data['responses']}`;
            })
    }

    onButtonCLick = (event) => {
        this.loaderTimeout();
        fetch('./form', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                email: this.emailInput.value,
                confirm: this.privacyPolicyCheck.checked,
            })
        })
            .then(response => {
                switch (response.ok) {
                    case false:
                        if (this.emailInput.value == '') {
                            this.emailInput.style.marginBottom = 25 + 'px';
                            this.emailError.style.display = 'inline-block';
                        } else {
                            this.emailError.style.display = 'none';
                            this.emailInput.style.marginBottom = 60 + 'px';
                            this.privacyCheckFlexContainer.style.marginBottom = 25 + 'px';
                            this.privacyPolicyError.style.display = 'block';
                        }
                        break;
                    case true:
                        this.button.setAttribute('style', 'width: 48px; height; 48px; background: transparent; border: 1px solid #DEDEDE; pointer-events: none;');
                        this.privacyPolicyError.style.display = 'none';
                        this.buttonText.style.display = 'none';
                        this.buttonSVG.style.display = 'none';
                        this.successfulSubmitSVG.style.display = 'block';
                        this.successfulSubmit.style.display = 'inline';
                        this.formWrapper.style.opacity = 0.3;
                        break;
                }
            })

        event.preventDefault()
    }

    loaderTimeout = () => {
        document.body.style.overflowY = 'hidden'
        this.loader.style.display = 'block';
        let load = setTimeout(this.hideLoader, 5100)
    }

    hideLoader = () => {
        document.body.style.overflowY = 'visible';
        this.loader.style.display = 'none';
    }
}

export default VacancyForm