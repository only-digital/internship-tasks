import Component from '../../app/js/base/Component';

class Checkbox extends Component {
    constructor(element) {
        super(element);
        this.eventName = this.root.dataset.event;
        this.input = this.getElement('input')
        this.input.addEventListener('change',this.handleCheckboxClick);
    }

    handleCheckboxClick = () => {
        this.input.dispatchEvent(new CustomEvent(this.eventName));
    }

}

export default Checkbox