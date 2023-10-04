import Component from '../../app/js/base/Component';

class Spoiler extends Component {
    textElement;
    element;

    constructor(element) {
        super(element);


        this.item = this.root
        this.textElement = this.getElement('text')

        this.root.addEventListener('click', this.onClick)
    }

    onClick = () => {
        this.item.classList.toggle('active')


        if(this.item.classList.contains('active')){
            const heightBlock = this.textElement.scrollHeight;
            this.textElement.style.maxHeight = heightBlock + 'px'
        }
        else{
            this.textElement.style.maxHeight = 0
        }
    }


}

export default Spoiler