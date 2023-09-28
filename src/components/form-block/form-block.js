import Component from '../../app/js/base/Component';

class FormBlock extends Component {
    buttonSubmit;
    inputElement;
    checkboxElement;
    checkboxBlock;
    errorMessage;
    successBlock;
    successMessage;
    loader;

    constructor(element) {
        super(element);

        this.buttonSubmit = this.getElement('button');
        this.errorMessage = this.getElement('error-message');
        this.successBlock = this.getElement('success-message');
        this.successMessage = this.getElement('message-text');
        this.loader = this.getElement('loader');
        this.checkboxBlock = this.getElement('checkbox');
        
        this.buttonSubmit.addEventListener('click', this.onSubmit);
    }
    
    onSubmit = (event) => {
        event.preventDefault();
        
        this.loader.classList.remove('hidden');
        this.buttonSubmit.classList.add('hidden');

        this.inputElement = this.getElement('input-field');
        this.checkboxElement = this.getElement('checkbox-field');

        const inputValue = this.inputElement.value;
        const isChecked = this.checkboxElement.checked;

        this.sendData(JSON.stringify({
            email: inputValue,
            confirm: isChecked
        })).then(response => {
            const {message, status} = response;
            if(status === 200) {
                this.successBlock.classList.remove('hidden');
                this.successMessage.textContent = message;

                this.inputElement.classList.add('disabled');
                this.checkboxBlock.classList.add('disabled');
                this.errorMessage.classList.remove('error');
            } else if(status === 422) {
                this.errorMessage.classList.add('error');
                this.errorMessage.textContent = message;
                this.buttonSubmit.classList.remove('hidden');
            }
            this.loader.classList.add('hidden');
        })
    }

    sendData = async (data) => {
        return new Promise(async (resolve, reject) => {
            await fetch('/form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
        .then(async response => {
            const json = await response.json();
            return {
                status: response.status,
                message: json.message
            }
        });
    }
}

export default FormBlock