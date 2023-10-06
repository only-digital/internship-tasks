import Component from '../../app/js/base/component';

class OnlyLiContent extends Component {
    
    textElement;

    constructor(element) {
        super(element);
        this.textElement = this.getElement('content-block')
        this.root.addEventListener('click',this.listItemClick);

    }

    listItemClick = ()=> {

        (this.root.classList.contains('only-li-content_closed'))
            ? this.textElement.style.maxHeight=this.textElement.scrollHeight+'px'
            : this.textElement.style.maxHeight=0+'px';

        this.root.classList.toggle('only-li-content_closed');
        
    };
    
}

export default OnlyLiContent