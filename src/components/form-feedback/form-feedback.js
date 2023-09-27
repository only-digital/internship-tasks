import Component from '../../app/js/base/Component';

class FormFeedback extends Component {
    URL;
    form;
    inputEmail;
    confirm;
    loader;
    message;
    sendButton;

    constructor(element) {
        super(element);
        this.URL = '/form';
        this.form = this.getElement('form');
        this.inputEmail = this.getElement('input-email');
        this.confirm = this.getElement('checkbox')
        this.loader = this.getElement('loader');
        this.message = this.getElement('message');
        this.sendButton = this.getElement('button');

        this.form.addEventListener('submit', this.onSubmitHandler);
    }

    onSubmitHandler = (e) =>{
        e.preventDefault()
        this.startLoader()

        const email = this.inputEmail.value
        const confirm = this.confirm.checked

        fetch(this.URL, {
            method: 'POST',
            body: JSON.stringify({
                email,
                confirm,
            }),
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(res => {
                console.log(res)
                if(res.status === 422){
                    res.json().then(mes => this.renderError(mes.message))

                }else if(res.status === 200){
                    res.json().then(mes => this.renderSuccess(mes.message))
                }
            })
            .finally(() => {
                this.stopLoader()
                this.inputEmail.value = ''
                this.confirm.checked = false
            })
    }

    renderError(message){
        this.message.textContent = message
        this.message.className= 'form-feedback__message-red'
    }

    renderSuccess(message){
        this.message.textContent = message
        this.message.className = 'form-feedback__message-green'
    }

    startLoader(){
        this.sendButton.disabled = 'disabled'
        this.loader.classList.add('active')
    }

    stopLoader(){
        this.sendButton.disabled = ''
        this.loader.classList.remove('active')
    }
}

export default FormFeedback