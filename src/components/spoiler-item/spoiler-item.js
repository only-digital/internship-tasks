import Component from '../../app/js/base/Component';

console.log(1);

class SpoilerItem extends Component {
    constructor(element) {
        super(element);

        const head = this.getElement("spoiler-item")
        
        head.addEventListener("click", this.onSpoilerClick)
    }

    onSpoilerClick = () => {
        this.root.classList.toggle("spoiler-item__active")
    }
}

export default SpoilerItem;
