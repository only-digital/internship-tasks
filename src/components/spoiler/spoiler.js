import Component from '../../app/js/base/Component';

class Spoiler extends Component {
	spoilerHeader;
	constructor(element) {
		super(element);

		this.spoilerHeader = this.getElement('header')

		this.spoilerHeader.addEventListener('click', this.onButtonClick)
	}

	onButtonClick = (e) => {
		const target = e.target
		const textContent = target.parentNode.nextSibling

		target.closest('.spoiler').classList.toggle('open')
		this.smoothSpoiler(textContent)
	}

	smoothSpoiler = (el) => {
		if (el.closest('.spoiler').classList.contains('open')) {
			el.style.height = el.scrollHeight + 'px'
		}
		else
			el.style.height = 0;
	}
}

export default Spoiler