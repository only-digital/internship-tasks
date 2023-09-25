import Component from '../../app/js/base/Component';

class Spoiler extends Component {
    iconElement;
    textElement;
    isOpen = true;

    constructor(element) {
        super(element);

        this.textElement = this.getElement('text')
        this.iconElement = this.getElement('svg')

        this.root.addEventListener('click', this.onButtonClick)
    }

    onButtonClick = () => {

        if (this.isOpen){
            const scrollHeight = this.textElement.scrollHeight
            this.textElement.classList.toggle('open')
            this.iconElement.classList.toggle('open')
            this.textElement.style.height = `${scrollHeight}px`
            this.isOpen = !this.isOpen
        }else{
            this.textElement.classList.toggle('open')
            this.iconElement.classList.toggle('open')
            this.textElement.style.height = '0'
            this.isOpen = !this.isOpen
        }

    }
}

export default Spoiler