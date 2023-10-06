import Component from '../../app/js/base/component';

class OnlyLiContent extends Component {
    
    textElement;

    constructor(element) {
        super(element);
        this.textElement = this.getElement('text')
        this.root.addEventListener('click',this.listItemClick);
        // Your code here
    }

    listItemClick = ()=> {
        this.root.classList.toggle('only-li-content_closed');
        this.root.classList.toggle('only-li-conten_open');
    };
    // Your code here
}

export default OnlyLiContent