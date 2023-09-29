import Component from '../../app/js/base/Component';

class Accordion extends Component {
    constructor(element) {
        super(element);

        this.root.addEventListener('click', this.handleExpandContent);
    }

    handleExpandContent = (e) => e.currentTarget.contains(e.target) && e.currentTarget.classList.toggle('expanded');
}

export default Accordion