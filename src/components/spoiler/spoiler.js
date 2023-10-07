import Component from '../../app/js/base/Component';

class Spoiler extends Component {
    spoiler;

    constructor(element) {
        super(element);

        this.spoiler = this.getElement('main-wrapper')

        this.root.addEventListener('click', this.onSpoilerClick)
    }
    onSpoilerClick = () => {
        this.root.classList.toggle('spoiler--opened')
    }
}

export default Spoiler