import Component from '../../app/js/base/Component';

class Spoiler extends Component {
    textElem;
    titleElem;

    constructor(element) {
        super(element);

        this.textElem = this.getElement('text-container');
        this.titleElem = this.getElement('title');
        this.root.addEventListener('click', this.onClick);
    }

    onClick = () => {
        this.textElem.classList.toggle('active');
        this.titleElem.classList.toggle('active');

        if (this.textElem.classList.contains('active')) {
            const heightBlock = this.textElem.scrollHeight;
            this.textElem.style.height = heightBlock + 'px';
        } else {
            this.textElem.style.height = '0';
        }
    }
}

export default Spoiler