import Component from '../../app/js/base/component';

class SpoilerItem extends Component {
    bodyElement;

    constructor(element) {
        super(element);
        this.bodyElement = this.getElement('body');
        this.root.addEventListener('click', this.onClick);
    }

    onClick = () => {
        this.root.classList.toggle('spoiler-item_active');
    }
}

export default SpoilerItem