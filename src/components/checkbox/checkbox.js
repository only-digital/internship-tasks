import Component from '../../app/js/base/Component';

class Checkbox extends Component {
	errorLabel;
	constructor(element) {
		super(element);

		this.errorLabel = this.root.parentNode.nextElementSibling;

		this.root.addEventListener('change', this.onCheckHandler)

	}

	onCheckHandler = (e) => {
		if (e.target.checked)
			this.errorLabel.textContent = ''
	}
}
export default Checkbox

