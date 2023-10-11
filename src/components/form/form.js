import Component from '../../app/js/base/component';

class Form extends Component {
    email;
    error;
    success;
    successMessage;
    checkbox;
    wrap;
    button;
    loader;

    constructor(element) {
        super(element);

        this.form = this.root
        this.button = this.getElement('button')
        this.loader = this.getElement('loader')
        this.email = this.getElement('input')
        this.error = this.getElement('error')
        this.success = this.getElement('success')
        this.successMessage = this.getElement('success-text')
        this.checkbox = this.getElement('checkbox')
        this.wrap = this.getElement('checkbox-wrap')

        this.button.addEventListener('click', this.onClick)
    }

    async fetchPost () {
        this.loader.classList.add('active')
        this.button.classList.add('hidden')
        try {
            const res = await fetch("/form", {
                method: "POST",
                body: JSON.stringify({
                    email: this.email.value,
                    confirm: this.checkbox.checked,
                }),
                    
                headers: {
                "content-type": "application/json",
            }
            })
            const data = await res.json()
    
               
            if(res.status === 422){
                this.loader.classList.remove('active')
                this.button.classList.remove('hidden')
                this.error.textContent = data.message
            }
            else if(res.status === 200){
                this.loader.classList.remove('active')
                this.success.classList.remove('hidden')
                this.error.textContent = ''
                this.successMessage.textContent = data.message
                this.email.setAttribute('disabled', '')
                this.wrap.setAttribute('disabled', '')
            }
        } catch (error) {
            console.error(error)
        }  
    } 



    onClick = (e) => {
        e.preventDefault()

        this.fetchPost()
    }
}

export default Form