import Component from '../../app/js/base/Component';

class SpoilerItem extends Component {
    bodyElement;

    constructor(element) {
        super(element);
        this.bodyElement = this.getElement('body');
        this.root.addEventListener('click', this.onButtonClick);
    }

    onButtonClick = () => {
        this.root.classList.toggle('spoiler-item_active');
    }
}

export default SpoilerItem