import Component from '../../app/js/base/Component';

class Spoiler extends Component {
    spoilerContainer;
    paragraph;
    spoilerContent;
    spoilerShown;

    constructor(element) {
        super(element);

        this.spoilerContainer = this.getElement('container');
        this.paragraph = this.getElement('paragraph');
        this.spoilerContent = this.getElement('content');

        this.spoilerShown = false;

        this.spoilerContainer.onclick = this.onButtonClick;
    }

    onButtonClick = () => {
        this.spoilerShown = !this.spoilerShown;

        if (this.spoilerShown) {
            this.spoilerContainer.classList.add('show-spoiler');
            this.spoilerContent.style.height = this.paragraph.clientHeight + 'px';
        } else {
            this.spoilerContainer.classList.remove('show-spoiler');
            this.spoilerContent.style.height = 0;
        }
    }
}

export default Spoiler
