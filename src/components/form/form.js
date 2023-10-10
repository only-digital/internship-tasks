import Component from '../../app/js/base/Component';

class Form extends Component {
    serverError;

    constructor(element) {
        super(element);

        this.root.addEventListener('submit',this.handleFormSubmit);
        this.serverError = this.getElement('server-error')
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(this.root);
        console.log(formData);
    }

    setError = (errorText) => {
        this.serverError.classList.remove('form_invisible-elem');
        this.serverError.textContent = errorText;
    }

    clearError = () => {
        this.serverError.textContent = '';
        this.serverError.classList.add('form_invisible-elem');
    }

    submitData = async (data) => {
        this.clearError();
        const url = 'http://localhost:3000/form';
        try {
            this.showLoader();
            const response = await fetch(url,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body:JSON.stringify(data)
            });
            this.hideLoader();
            if (response.ok) {
                this.setSuccess();
            } else this.setError(response.statusText);
        } catch (error) {
            console.error(error);
        }
    }

}

export default Form