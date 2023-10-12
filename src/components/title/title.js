import Component from '../../app/js/base/Component';

class Title extends Component {
    views;
    responses;
    vacancyData;

    constructor(element) {
        super(element);

        this.views = this.getElement('views-data')
        this.responses = this.getElement('responses-data')
        this.vacancyData = this.getElement('vacancy-data')
        document.addEventListener('DOMContentLoaded', this.getData)
    }

    getData = async () => {
        const response = await fetch('/stats')
        const data = await response.json()

        this.vacancyData.classList.remove('title__vacancy-data--loading')

        this.responses.textContent =  data.responses
        this.views.textContent = data.views
    }
}

export default Title