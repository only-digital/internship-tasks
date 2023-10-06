import Component from '../../app/js/base/component';

class OnlySlider extends Component {
    listItems;
    items;
    constructor(element) {
        super(element);

        this.listItems=this.getElement('block-content');
        this.items = this.listItems.querySelectorAll('.only-li-content');
        this.items[0].classList.add('only-li-content_first');
       
    }

}

export default OnlySlider