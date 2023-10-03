import Component from '../../app/js/base/Component';

class Item extends Component {
    
    constructor(element) {
        super(element);
        this.root.addEventListener('click', this.onBoxClick)
    }

    onBoxClick = () => {
        this.root.classList.toggle('open')
    }
}

export default Item