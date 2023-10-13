import Component from '../../app/js/base/Component';

class Textarea extends Component {

    constructor(element) {
        super(element);

        this.eventName = this.root.dataset.event;
        this.textarea = this.getElement('area');
        this.errorTextarea = this.getElement('error');
        this.tipTextarea = this.getElement('svg');
        this.textarea.addEventListener('input',this.handleTextareaInput);
        this.textarea.addEventListener('blur',this.handleTextareaCorrectInput);
    }

    handleTextareaInput = (event) => {
        if (event.target.value.length > 1000) {
            this.showTextareaError();
        } else this.hideTextareaError();
        this.textarea.setAttribute('style', 'height:' + (event.target.scrollHeight) + 'px;overflow-y:hidden;');
        this.textarea.style.height = 'auto';
        this.textarea.style.height = event.target.scrollHeight+'px';
    }

    handleTextareaCorrectInput = (event) => {
        if (event.target.value.length >= 1 && event.target.value.length <=1000) {
            this.showCorrectTextAreaInput();
        } else {
            this.hideCorrectTextareaInput();
        }
    }

    showTextareaError = () => {
        this.errorTextarea.classList.remove('textarea_invisible_elem');
        this.textarea.classList.add('textarea_error');
    }

    hideTextareaError = () => {
        this.errorTextarea.classList.add('textarea_invisible_elem');
        this.textarea.classList.remove('textarea_error');
    }

    showCorrectTextAreaInput = () => {
        this.textarea.classList.add('textarea__area_correct_input');
        this.tipTextarea.classList.remove('textarea_invisible_elem');
        this.textarea.dispatchEvent(new CustomEvent(this.eventName,{
            detail: {
                textarea:true
            }
        }));
    }

    hideCorrectTextareaInput = () => {
        this.textarea.classList.remove('textarea__area_correct_input');
        this.tipTextarea.classList.add('textarea_invisible_elem');
        this.textarea.dispatchEvent(new CustomEvent(this.eventName,{
            detail: {
                textarea:false
            }
        }));
    }

}

export default Textarea