import Component from '../../app/js/base/Component';
import validateForm from '../../helpers/validateForm';
class FeedbackForm extends Component {
    feedbackForm
    submitButton
    attachEl
    emailInput

    constructor(element) {
        super(element);

        this.feedbackForm = this.getElement('controls');
        this.feedbackForm.addEventListener('submit', this.handleSubmitForm);
        this.feedbackForm.addEventListener('keypress', this.handleEnterPressed);
        
        this.emailInput = document.getElementById('email');
        this.submitButton = document.querySelector('.submit-button');

        this.attachEl = document.querySelector('.attach-button');
    }

    handleEnterPressed = (e) => {
        validateForm();
        if (e.keyCode === 13 && this.feedbackForm.classList.contains('invalid')) {
            e.preventDefault();
        }
    }

    handleSubmitForm = async (e) => {
        e.preventDefault();
        const formData = new FormData(this.feedbackForm, this.submitButton);
        formData.delete('attachment');
        e.files.forEach((file) => formData.append('attachment', file));

        const response = await fetch('/form', {
            method: 'POST',
            body: formData,
        })
        console.log(response);

        return response;
    }
}

export default FeedbackForm