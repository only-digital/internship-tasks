import Component from '../../app/js/base/component';

class OnlyInput extends Component {
    input; 
    error;
    constructor(element) {
        super(element);
        this.input = this.getElement('field');
        this.error = this.getElement('error');
        this.root.addEventListener('click',this.focus);
        this.input.addEventListener('blur',this.blur);
        console.log(this.input);
    }

    focus=()=>{
        this.root.classList.add('only-input_focus');
        this.input.focus();
        
    }

    blur=()=>{
        this.root.classList.remove('only-input_focus');
        let validation =/^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/;
        if(!validation.test(this.input.value)){
            this.error.textContent = "Incorrect email!"
            this.root.classList.add('only-input_invalidate');
            this.root.classList.remove('only-input_validate');

        }
        else if(this.input.value.length>255){
            this.error.textContent = "To long email!"
            this.root.classList.add('only-input_invalidate');
            this.root.classList.remove('only-input_validate');
        }
        else{
            this.root.classList.add('only-input_validate');
            this.root.classList.remove('only-input_invalidate');
        }
      

    }
}

export default OnlyInput