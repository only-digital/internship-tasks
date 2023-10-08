import Component from '../../app/js/base/Component';

class AccordionItem extends Component {
    titleElementHeight;
    textElement;
    textElementHeight;
    constructor(element) {

        super(element);
        this.titleElementHeight = this.root.querySelector('.accordion-item__title').offsetHeight;
        this.textElement = this.root.querySelector('.accordion-item__text');
        this.textElementHeight = this.textElement.offsetHeight;
        element.component.style.height = this.titleElementHeight +'px';
        this.root.addEventListener('click', this.onButtonClick)

    }

    onButtonClick = (e) =>{
        const {target} = e;
        const item = target.closest('.accordion-item')
        if(item.classList.contains('accordion-item__active')) {
            item.classList.remove('accordion-item__active')
            item.style.height = this.titleElementHeight + 'px'
            this.textElement.style.top = 0;
        } else {
            item.classList.add('accordion-item__active')
            item.style.height = this.titleElementHeight + this.textElementHeight + 20 + 'px'
            this.textElement.style.top = this.titleElementHeight + 'px';
        }


    }


}

export default AccordionItem
