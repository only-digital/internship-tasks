import Component from '../../app/js/base/Component';

class VacancyInfo extends Component {
    statusElement

    constructor(element) {
        super(element);

        this.statusElement = this.getElement('status');

        fetch('http://localhost:3000/stats')
        .then((response) => response.json())
        .then((data) => {
            document.querySelector('.loader').classList.remove('active');
            const [viewsCount, responsesCount] = this.statusElement.children;
            viewsCount.textContent =  viewsCount.textContent.replace(/\d+/g, data.views);
            responsesCount.textContent = responsesCount.textContent.replace(/\d+/g, data.responses);
        }) 
    }
}

export default VacancyInfo