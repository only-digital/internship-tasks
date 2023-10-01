import Component from '../../app/js/base/Component';

class Accordion extends Component {
    constructor(element) {
        super(element);

        // Your code here
        this.root.addEventListener("click", this.onClick) // Добавление обработчика события click
    }

    // Your code here
    onClick = (event) => {                
        if(event.target.closest(".accordion")) {   //если кликнутый эл-т явл потомком accordion
            console.log(event.target)
            this.root.classList.toggle("active")        //добавить active корнев элту accordion
        }
    }
}

export default Accordion





    