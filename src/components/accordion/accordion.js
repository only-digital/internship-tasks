import Component from '../../app/js/base/Component';

class Accordion extends Component {
	constructor(element) {
		super(element);

		const accordions = document.querySelectorAll('.accordion');
		accordions.forEach((el) => {
			el.addEventListener('click', (e) => {
				const self = e.currentTarget;
				const content = self.querySelector('.accordion__content');

				accordions.forEach((accordion) => {
					if (accordion !== self) {
						accordion.classList.remove('open');
						accordion.querySelector(
							'.accordion__content'
						).style.maxHeight = null;
					}
				});

				self.classList.toggle('open');
				if (self.classList.contains('open')) {
					content.style.maxHeight = content.scrollHeight + 'px';
				} else {
					content.style.maxHeight = null;
				}
			});
		});
	}
}

export default Accordion;
