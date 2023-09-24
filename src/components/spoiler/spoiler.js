import Component from '../../app/js/base/Component';

class Spoiler extends Component {
	spoilers;
    constructor(element) {
		super(element);

		this.spoilers = this.getElements('item')

		for (let spoiler of this.spoilers) {
			const headerOfSpoiler = spoiler.querySelector('.spoiler__item__header')

			headerOfSpoiler.addEventListener('click', this.onButtonClick)	
		}	
	}

	 onButtonClick = (e) => {
		const target = e.target
		const textContent = target.parentNode.nextSibling 

		target.closest('.spoiler__item').classList.toggle('open')
		this.smoothSpoiler(textContent)		
	 }

	 smoothSpoiler = (el) => {
		if (el.closest('.spoiler__item').classList.contains('open')) {
			el.style.height = el.scrollHeight + 'px'
		}
		else 
			el.style.height = 0;
	 }
}

export default Spoiler