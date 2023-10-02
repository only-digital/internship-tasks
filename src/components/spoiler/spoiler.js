import Component from '../../app/js/base/Component';

class Spoiler extends Component {
    spoiler;
    textContent;

    constructor(element) {
        super(element);

        this.spoiler = this.getElement('main-wrapper')
        this.textContent = this.getElement('bottom-wrapper')

        this.root.addEventListener('click', this.onSliderClick)
    }
    onSliderClick = () => {
        this.root.classList.toggle('spoiler--active')

        if (this.textContent.style.maxHeight) {
            this.textContent.style.maxHeight = null;
        } else {
            this.textContent.style.maxHeight = this.textContent.scrollHeight + 'px';
        }
    }
}

export default Spoiler