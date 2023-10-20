import Component from '../../app/js/base/Component';

class Spoiler extends Component {
    spoilerContainer;
    toggleButton;

    constructor(element) {
        super(element);

        this.spoilerContainer = this.getElement('container');
        this.toggleButton = this.getElement('toggle-button');

        this.toggleButton.onclick = this.onButtonClick;
    }

    onButtonClick = () => {
        this.spoilerContainer.classList.toggle('show-spoiler');
    }
}

export default Spoiler
