import Component from '../../app/js/base/Component';

class Spoiler extends Component {
    toggleButton;

    constructor(element) {
        super(element);

        this.toggleButton = document.querySelector('.spoiler__button');
        this.root.addEventListener('click', this.onToggleButtonClick.bind(this));
    }

    onToggleButtonClick = () => {
        this.root
            .querySelector('.spoiler__collapse')
            .classList.toggle('spoiler__collapse_open');
    }
}

export default Spoiler