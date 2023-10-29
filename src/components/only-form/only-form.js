import Component from '../../app/js/base/component';

class OnlyForm extends Component {
    input;
    textArea;
    fileInput;
    agreement;
    sendButtom;

    constructor(element) {
        super(element);

        const block = this.getElement('input-block');
        this.input = block.querySelector('.only-input');
        this.textArea = block.querySelector('.only-text-area');
        this.fileInput = block.querySelector('.only-file-input');
        this.agreement = block.querySelector('.only-agreement');
        this.sendButtom = block.querySelector('.only-btn');

        this.sendButtom.setAttribute('disabled','disabled');
    }

    // Your code here
}

export default OnlyForm