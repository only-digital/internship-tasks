import Component from '../../app/js/base/Component';

class Textarea extends Component {
    textarea;
    error;
    svg;

    constructor(element) {
        super(element);
        this.textarea = this.getElement('area');
        this.error = this.getElement('error');
        this.svg = this.getElement('svg');
        this.textarea.addEventListener('input',this.handleTextareaInput);
        this.textarea.addEventListener('blur',this.handleTextareaCorrectInput);
    }

    handleTextareaCorrectInput = (event) => {
        if (event.target.value.length >= 1 && event.target.value.length <=1000) {
            this.showCorrectInput();
        } else {
            this.hideCorrectInput();
        }
    }

    showCorrectInput = () => {
        this.textarea.classList.add('textarea__area_correct_input');
        this.svg.classList.remove('textarea_invisible_elem');
    }

    hideCorrectInput = () => {
        this.textarea.classList.remove('textarea__area_correct_input');
        this.svg.classList.add('textarea_invisible_elem');
    }

    showError = () => {
        this.error.classList.remove('textarea_invisible_elem');
        this.textarea.classList.add('textarea_error');
    }

    hideError = () => {
        this.error.classList.add('textarea_invisible_elem');
        this.textarea.classList.remove('textarea_error');
    }

    handleTextareaInput = (event) => {
        if (event.target.value.length > 1000) {
            this.showError();
        } else this.hideError();
        this.textarea.setAttribute('style', 'height:' + (event.target.scrollHeight) + 'px;overflow-y:hidden;');
        this.textarea.style.height = 'auto';
        this.textarea.style.height = event.target.scrollHeight+'px';
    }
}

export default Textarea