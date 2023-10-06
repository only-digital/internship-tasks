import Component from '../../app/js/base/Component';

class Accordion extends Component {
    
    text;

    constructor(element) {
        super(element);
        this.text = this.getElement('text');
            
        this.root.addEventListener("click", this.onClick);
    }

    // Your code here
    onClick = () => {                
        
        this.root.classList.toggle("active")        //добавить active корнев элту accordion

        if (this.root.classList.contains('active')) {
            this.text.style.height = this.text.scrollHeight + 'px';
        } else {
            this.text.style.height = 0;
        }    
    }
}

export default Accordion





    