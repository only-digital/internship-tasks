import Component from '../../app/js/base/Component';

class Spoiler extends Component {
    paragraph;
    heading;
    toggleButton;

    constructor(element) {
        super(element);

        this.paragraph = this.getElement('paragraph');
        this.heading = this.getElement('heading');
        this.toggleButton = this.getElement('toggle-button');

        this.toggleButton.onclick = this.onButtonClick;
    }

    onButtonClick = () => {
        this.paragraph.classList.toggle('shown');
        this.heading.classList.toggle('blue');
    }
}

export default Spoiler
