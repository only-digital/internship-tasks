import Component from '../../app/js/base/Component';

class Spoiler extends Component {
    iconElement;
    textElement;

    constructor(element) {
        super(element);

        this.textElement = this.getElement('text')
        this.iconElement = this.getElement('svg')

        this.root.addEventListener('click', this.onButtonClick)
    }

    onButtonClick = () => {
        this.textElement.classList.toggle('open')
        this.iconElement.classList.toggle('open')
    }
}

export default Spoiler