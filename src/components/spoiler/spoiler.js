import Component from '../../app/js/base/Component';

class Spoiler extends Component {
    constructor(element) {
        super(element);
        this.root.addEventListener('pointerdown', this.handleCrossClick)
    }

    handleCrossClick = (event) => {
        if(event.target.closest(".spoiler__subtitle")){
            if (event.target.classList.contains('spoiler__icon')) {
                event.target.parentNode.parentNode.classList.toggle("spoiler_opened")
            } else event.target.parentNode.classList.toggle("spoiler_opened")
        }
    }
}

export default Spoiler