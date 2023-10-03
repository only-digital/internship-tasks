import Component from '../../app/js/base/Component';

class Header extends Component {
    constructor(element) {
        super(element);

        this.item = this.getElement('item');
		this.views = this.getElement('views');
		this.responses = this.getElement('responses');

		this.getData();
    }

	getData = () => {
		return fetch('/stats')
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					this.views.innerHTML = `Просмотров: ${data.views}`;
					this.responses.innerHTML = `Откликов: ${data.responses}`;
				});
	}
}

export default Header