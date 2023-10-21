import Component from '../../app/js/base/component';

class FeedbackForm extends Component {
    button;

    constructor(element) {
        super(element);

        this.button = this.getElement('submit-btn')
        
        this.button.addEventListener('click', this.onButtonClick)
    }

    onButtonClick = (event) => {
        event.preventDefault()
    }
}

export default FeedbackForm