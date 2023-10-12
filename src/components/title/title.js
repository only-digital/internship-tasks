import Component from '../../app/js/base/Component';

class Title extends Component {
    views;
    responses;

    constructor(element) {
        super(element);

        this.views = this.getElement('views-data')
        this.responses = this.getElement('responses-data')
        document.addEventListener('DOMContentLoaded', this.getData)
    }

    getData = async () => {
        const response = await fetch('/stats')
        const data = await response.json()
        this.responses.textContent =  data.responses
        this.views.textContent = data.views
    }
}

export default Title