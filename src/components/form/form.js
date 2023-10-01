import Component from '../../app/js/base/Component';

class Form extends Component {
    constructor(element) {
        super(element);

        this.root.addEventListener('submit', this.handleFormSubmit)
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(this.root);
        console.log(formData);
    }
}

export default Form