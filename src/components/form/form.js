import Component from '../../app/js/base/component';

class Form extends Component {
    
    emailField
    email;
    strReg = /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/;
    
    msg;
    msgArea;
    msgError;

    checkbox;
    checkboxInput;
    checkboxError;

    filesBlock;
    fileInput;

    form;
    btn;

    constructor(element) {
        super(element);
        
        this.email = this.root.querySelector(".input-field")
        this.emailInput = this.email.querySelector("[name='email']")
        this.emailError = this.email.querySelector(".input-field__error")
        this.emailInput.addEventListener("input", () => this.clearStatusField(this.email, this.emailError))

        this.msg = this.root.querySelector(".textarea")
        this.msgArea = this.msg.querySelector(".textarea__item")
        this.msgError = this.msg.querySelector(".textarea__error")
        this.msgArea.addEventListener("input", () => this.clearStatusField(this.msg, this.msgError))
        
        this.checkbox = this.root.querySelector(".checkbox")
        this.checkboxInput = this.checkbox.querySelector(".checkbox__input")
        this.checkboxError = this.checkbox.querySelector(".checkbox__error")

        this.filesBlock = this.root.querySelector(".file")
        this.fileInput = this.root.querySelector(".file__input")

        this.form = this.getElement("form")
        this.form.addEventListener("change", this.changeForm)

        this.btn = this.root.querySelector(".btn")
        this.btn.addEventListener("click", this.formSend)
        
    }

    clearStatusField = (field, err) => {
        field.classList.remove('error', 'success')
        err.textContent = ""
    }

    toggleStatus = (bool, field, err, msg = '') => {
        if(bool) {
            field.classList.remove('error')
            field.classList.add('success')
            err.textContent = msg
        }
        else {
            field.classList.add('error')
            err.textContent = msg
        }
        return bool
    }

    emailIsValid = (show = true) => {
        let res = false

        if(!this.emailInput.value.trim().length) 
            return show ? this.toggleStatus(res, this.email, this.emailError, "Поле 'E-mail' не должно быть пустым!") : res;
        
        if(this.emailInput.value.trim().length > 255) 
            return show ? this.toggleStatus(res, this.email, this.emailError, "Поле 'E-mail' не должно содержать более 255 символов") : res;
        
        const reg = new RegExp(this.strReg)
        if(!reg.test(this.emailInput.value)) 
            return show ? this.toggleStatus(res, this.email, this.emailError, "Введен некорректный 'E-mail'") : res;

        res = true
        return show ? this.toggleStatus(res, this.email, this.emailError) : res;
    }

    msgIsValid = (show = true) => {
        let res = false

        if(!this.msgArea.value.trim().length) 
            return show ? this.toggleStatus(res, this.msg, this.msgError, "Поле 'Ваше сообщение' не должно быть пустым!") : res;

        if(this.msgArea.value.trim().length > 1000) 
            return show ? this.toggleStatus(res, this.msg, this.msgError, "Поле 'Ваше сообщение' не должно содержать более 1000 символов") : res;

        res = true
        return show ? this.toggleStatus(res, this.msg, this.msgError) : res;
    }

    checkboxIsValid = (show = true) => {
        let res = false

        if(!this.checkboxInput.checked) 
            return show ? this.toggleStatus(res, this.checkbox, this.checkboxError, "Подтвердите обработку персональных данных!") : res;

        res = true
        return show ? this.toggleStatus(res, this.checkbox, this.checkboxError) : res;
    }

    formIsValid = () => {
        // если все валидно, без вывода ошибок
        if(this.emailIsValid(false) && this.msgIsValid(false) && this.checkboxIsValid(false)) 
            this.btn.removeAttribute('disabled')
        else 
            this.btn.setAttribute('disabled', true)
    }

    changeForm = (e) => {
        // чтобы при работе с первым же полем не делать всю форму красной
        if(e.target.getAttribute('name') === 'email') 
            this.emailIsValid()
    
        if(e.target.getAttribute('name') === 'msg') 
            this.msgIsValid()

        if(e.target.getAttribute('name') === 'checkbox') 
            this.checkboxIsValid()

        this.formIsValid()
    }

    successSend = () => {
        this.emailInput.setAttribute('disabled', true)
        this.msgArea.setAttribute('disabled', true)
        this.checkboxInput.setAttribute('disabled', true)
        this.fileInput.setAttribute('disabled', true)
        this.filesBlock.classList.remove('error')
        this.filesBlock.classList.add('disabled')

        this.root.classList.add('success')
    }

    formSend = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('email', this.emailInput.value)
        formData.append('msg', this.msgArea.value)
        formData.append('confirm', this.checkboxInput.checked)
        if (window.myFiles.length) {
            for (const file of window.myFiles) {
                formData.append('file', file)
            }
        }
        try {
            // this.doLoader(true)
            const res = await fetch('/form', {
                method: "POST",
                body: formData,
            })
            if(res.ok) { // status 200
                this.successSend()
            }
        } catch (e) {
            console.log('errrrr: ', e)
            // this.error.textContent = 'Что то пошло не так. Попробуйте позже!'
        } finally {
            // this.doLoader(false)
        }
    }
}

export default Form