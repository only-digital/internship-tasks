import Component from '../../app/js/base/component';

class VacancyForm extends Component {
    error;
    button;
    email;
    checkbox;

    constructor(element) {
        super(element);

        this.email = this.getElement("input")
        this.checkbox = this.getElement("checkbox")
        this.error = this.getElement("error")
        this.button = this.getElement("btn")
        this.button.addEventListener("click", this.formSend)
        
    }

    formSend = async (e) => {
        e.preventDefault()
        try {
            this.doLoader(true)
            const res = await fetch('/form', {
                method: "POST",
                headers: {
                  "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({
                    email: this.email.value,
                    confirm: this.checkbox.checked 
                }),
            })
            const data = await res.json()
            if(!res.ok){
                this.error.textContent = data.message
            }
            else{
                this.root.classList.add('success') // status 200
            }
        } catch (e) {
            console.log(e)
            this.error.textContent = 'Что то пошло не так. Попробуйте позже!'
        } finally {
            this.doLoader(false)
        }
    }

    doLoader(bool) {
        if(bool) 
            this.root.classList.add('loading') 
        else 
            this.root.classList.remove('loading')
    }

}

export default VacancyForm