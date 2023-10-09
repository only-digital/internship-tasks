import Component from '../../app/js/base/Component';

class Accordion extends Component {
	constructor(element) {
		super(element);

		const accordions = document.querySelectorAll('.accordion');
		accordions.forEach((el) => {
			el.addEventListener('click', (e) => {
				const self = e.currentTarget;
				const control = self.querySelector('.accordion__control');
				const content = self.querySelector('.accordion__content');

				self.classList.toggle(open);

				if (self.classList.contains('open')) {
					content.style.maxHeight = content.scrollHeight = 'px';
				} else {
					content.style.maxHeight = null;
				}
			});
		});
	}
}

export default Accordion;
