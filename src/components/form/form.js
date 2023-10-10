import Component from '../../app/js/base/Component';

class Form extends Component {
    form;

    constructor(element) {
        super(element);
        console.log(this.root)

        this.root.addEventListener('submit',this.handleFormSubmit);
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(this.root);
        console.log(formData);
    }

}

export default Form