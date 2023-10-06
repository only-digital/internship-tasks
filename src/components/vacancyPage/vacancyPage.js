import Component from '../../app/js/base/Component';

class VacancyPage extends Component {
    responses
    views
    constructor(element) {
        super(element);
        this.responses = this.getElement('responses');
        this.views = this.getElement('views');
        this.fetchData('/stats').then(data => {
            this.views.textContent = `Просмотров: ${data.views}`;
			this.responses.textContent = `Откликов: ${data.responses}`;
        })
    }

    async fetchData(url) {
		return await fetch(url)
			.then(response => response.json())
			.catch(console.error)
	}
}

export default VacancyPage