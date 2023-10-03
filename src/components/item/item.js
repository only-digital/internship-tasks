import Component from '../../app/js/base/Component';

class Item extends Component {
    dropDownText;
    
    constructor(element) {
        super(element);

        this.dropDownText = this.getElement('text')

        this.root.addEventListener('click', this.onBoxClick)
    }

    onBoxClick = () => {
        this.root.classList.toggle('open')
    }
}

export default Item