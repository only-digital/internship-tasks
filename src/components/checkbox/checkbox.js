import Component from '../../app/js/base/Component';
import validateForm from '../../helpers/validateForm';

class Checkbox extends Component {
    checkboxElement
    submitButton

    constructor(element) {
        super(element);

        this.checkboxElement = this.getElement('status');
        this.checkboxElement.addEventListener('change', validateForm);

        this.submitButton = document.querySelector('.submit-button');
    }
}

export default Checkbox