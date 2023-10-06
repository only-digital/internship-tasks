import Component from '../../app/js/base/Component';

class Textarea extends Component {
    textarea;
    constructor(element) {
        super(element);
        this.textarea = this.getElement('area');
        this.textarea.addEventListener('keydown',this.handleTextareaInput);
    }

    handleTextareaInput = (event) => {
        console.log(event);
    }
}

export default Textarea