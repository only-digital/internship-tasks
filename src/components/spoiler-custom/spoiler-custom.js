import Component from '../../app/js/base/component';

class SpoilerCustom extends Component {

    constructor(element) {
        super(element);
        this.root.addEventListener('click', this.onButtonClick);
        this.titleElement.addEventListener('click', this.onButtonClick);
    }

    onButtonClick = () => {
        console.log('click');
        this.root.classList.toggle('active');
    }
}

export default SpoilerCustom
