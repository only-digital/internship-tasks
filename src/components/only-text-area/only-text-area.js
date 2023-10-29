import Component from '../../app/js/base/component';

class OnlyTextArea extends Component {
    textarea;
    error;

    constructor(element) {
        super(element);

        this.textarea = this.getElement('text');
        this.error = this.getElement('error');

        this.root.addEventListener('click',this.focus);
        this.textarea.addEventListener('blur',this.blur);
        this.textarea.addEventListener('input',this.reset);
    }

    focus = ()=>{
        this.root.classList.add('only-text-area_focus');
        this.textarea.focus();
    }

    reset=()=>{  
        this.root.classList.remove('only-text-area_invalidate');
    }

    showError = (message)=>{
        this.root.classList.add('only-text-area_invalidate');
        this.root.classList.remove('only-text-area_validate');
        this.error.textContent=message;
    }

    blur=()=>{
        this.root.classList.remove('only-text-area_focus');
   
        if(this.textarea.value.length>1000){
            this.showError("Message must be more than 0 and less than 1000 characters!");
            return;
        }
        else if(this.textarea.value===''){
            this.root.classList.remove('only-text-area_validate');
            this.root.classList.remove('only-text-area_invalidate');
        }
        else{
            this.root.classList.add('only-text-area_validate');
            this.root.classList.remove('only-text-area_invalidate');
        }
    }
}

export default OnlyTextArea