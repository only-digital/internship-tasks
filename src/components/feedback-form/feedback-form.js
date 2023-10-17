import Component from '../../app/js/base/component';

class FeedbackForm extends Component {
    button;
    link;
    constructor(element) {
        super(element);
      
        this.root.addEventListener('submit', (e) => this.handleSubmit(e))
        // Your code here
    }
    handleSubmit = (e) => {
        console.log('submiting!!')
        this.link = document.querySelector('.confirm__link');
        console.log(this.link);
    }
    // Your code here
}

export default FeedbackForm