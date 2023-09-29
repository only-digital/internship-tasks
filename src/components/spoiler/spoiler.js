import Component from '../../app/js/base/Component';

class Spoiler extends Component {

    constructor(element) {
        super(element);

        // Your code here

        this.root.addEventListener("click", this.onButtonClick)
    }
    
    // Your code here
    onButtonClick = (e) => {
        e.preventDefault();
        if(e.target.closest(".spoiler__title")){

            this.root.classList.toggle("active")

        }
    }
}

export default Spoiler