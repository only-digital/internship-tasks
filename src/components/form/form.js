import Component from '../../app/js/base/Component';

class Form extends Component {
    submit;
    input;
    userInfo;
    userInfoText;
    checkbox;
    inputsWrapper;
    loader;

    constructor(element) {
        super(element);

        this.submit = this.getElement('button')
        this.input = this.getElement('email-input')
        this.userInfo = this.getElement('user-info')
        this.userInfoText = this.getElement('user-info-text')
        this.checkbox = this.getElement('checkbox-input')
        this.inputsWrapper = this.getElement('inputs-wrapper')
        this.loader = this.getElement('loader')

        this.root.addEventListener('submit', (e) => {
            e.preventDefault();

            const inputValue = this.input.value

            const data = {
                email: inputValue,
                confirm: this.checkbox.checked  
            }

            this.sendData(data)
        })
    }

    sendData = async (data) => {
        this.userInfoText.textContent = ''
        this.submit.style.opacity = '0'
        this.inputsWrapper.classList.add('form__inputs-wrapper--disabled')
        this.loader.classList.add('form__loader--active')

        const response = await fetch('/form', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (response.status === 422) {
            this.userInfo.classList.add('form__user-info--error')
            this.userInfo.classList.remove('form__user-info--success')
            this.submit.style.opacity = '1'
            this.inputsWrapper.classList.remove('form__inputs-wrapper--disabled')
        } else {
            this.userInfo.classList.add('form__user-info--success') 
            this.userInfo.classList.remove('form__user-info--error')
        }

        this.loader.classList.remove('form__loader--active')

        const userData = await response.json();
        this.userInfoText.textContent = userData.message
    }
}

export default Form