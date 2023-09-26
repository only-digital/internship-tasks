import Component from '../../app/js/base/Component';

class Vacancy extends Component {

	views;
	responses;
	constructor(element) {
		super(element);

		this.rootName = 'stats';


		this.views = this.getElement('views');
		this.responses = this.getElement('responses');

		this.getData('/stats').then(data => {
			this.views.classList.remove('preloader');
			this.responses.classList.remove('preloader');

			this.views.textContent = `Просмотров: ${data.views}`;
			this.responses.textContent = `Откликов: ${data.responses}`;
		})

	}

	async getData(url) {
		return await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.catch(err => console.error(err))
	}
}

export default Vacancy