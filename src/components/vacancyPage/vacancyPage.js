import Component from '../../app/js/base/Component';

class VacancyPage extends Component {
    responsesEl
    viewsEl
    preloaderEl
    constructor(element) {
        super(element);
        this.responsesEl = this.getElement('responses');
        this.viewsEl = this.getElement('views');
        this.preloaderEl = this.getElement('preloader');
        this.showPreloader();
        this.fetchData('/stats').then(data => {
            this.viewsEl.textContent = `Просмотров: ${data.views}`;
			this.responsesEl.textContent = `Откликов: ${data.responses}`;
        })
        .catch(err => console.log('Данные не удалось загрузить.', err))
        .finally(()=> {
            this.hidePreloader();
        })
    }

    showPreloader = () => {
        this.preloaderEl.classList.add('active');
    }

    hidePreloader = () => {
        this.preloaderEl.classList.remove('active');
    }
    
    async fetchData(url) {
		return await fetch(url)
			.then(response => response.json())
			.catch(console.error)
	}
}

export default VacancyPage