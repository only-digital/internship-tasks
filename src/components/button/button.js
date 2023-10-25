import Component from '../../app/js/base/component';

class Button extends Component {
    constructor(element) {
        super(element);

        this.root.disabled= true
        
        this.form = document.querySelector('.form__wrap')
        this.email = this.form.querySelector('.input-email')
        this.textarea = this.form.querySelector('.input-textarea')
        this.checkbox = this.form.querySelector('.checkbox__input')
        this.form.addEventListener('change', this.onChange)

    }

    onChange = () => {
        if(this.email.classList.contains('valid') &&
        this.textarea.classList.contains('valid') &&
        this.checkbox.checked){
            this.root.disabled= false
        }else{
            this.root.disabled= true
        }
    }
}

export default Button