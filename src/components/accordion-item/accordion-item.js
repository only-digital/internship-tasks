import Component from '../../app/js/base/Component';

class AccordionItem extends Component {
    titleElement;
    textElement;
    crossElem;
    count;

    constructor(element) {
        super(element);

        // Поиск элемента с именем element-button__text внутри компонента
        this.titleElement = this.getElement('title');
        this.textElement = this.getElement('text');
        this.crossElem = this.getElement('svg');
        this.count = false;
        this.root.addEventListener('click', this.onTitleClick);
    }

   onTitleClick = () => {
        if (this.count === false) {
            this.crossElem.style.transform = 'rotate(0deg)';
            this.titleElement.style.color = '#114C9A';
            this.textElement.style.maxHeight = this.textElement.scrollHeight+'px';
            this.textElement.style.marginBottom = '40px';
            console.log(this.root)
           
            this.count = true;
        } else {
            this.crossElem.style.transform = 'rotate(45deg)';
            this.titleElement.style.color = '#012B34'
            this.textElement.style.maxHeight = null;
            this.textElement.style.marginBottom = '0';
            this.count = false;
        }
    }
}


export default AccordionItem