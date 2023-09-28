import Component from '../../app/js/base/Component';

class Accordion extends Component {
    parent;

    constructor(element) {
        super(element);

        this.parent = this.getElement('list');

        this.parent.addEventListener('click', this.handleExpandContent);
    }

    

    handleExpandContent = (e) => {
        const target = e.target;

        if (target.parentElement === this.parent) {
            target.classList.toggle('expanded');
        } else if (target.parentElement.parentElement === this.parent) {
            target.parentElement.classList.toggle('expanded');
        } else {
            target.parentElement.parentElement.classList.toggle('expanded');
        }
    }
}

export default Accordion