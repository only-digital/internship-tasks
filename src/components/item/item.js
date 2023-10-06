import Component from '../../app/js/base/Component';

class Item extends Component {
    innerText;
    dropDown;
    constructor(element) {
        super(element);

        this.innerText = this.getElement('text');
        this.dropDown = this.getElement('dropdown')
        this.root.addEventListener('click', this.onItemClick)
    }

    onItemClick = () => {
        this.root.classList.toggle('open');
        this.setContentHeight();
    }

    setContentHeight = () => {
        const contentHeight = this.innerText.scrollHeight;
        this.root.classList.contains('open') ? 
        this.dropDown.style.height = `${contentHeight}px`:
        this.dropDown.style.height = '0' 
    }
}

export default Item