import Component from '../../app/js/base/Component';

class Spoiler extends Component {
    constructor(element) {
        super(element);

		this.item = element.component;
		this.title = this.getElement('title');
		this.text = this.getElement('text');

		this.root.addEventListener('click', this.onClick);
    }

	onClick = (e) => {
		const textHeight = this.text.scrollHeight;

		if (this.item.classList.contains('active')) {
			this.remove('active', this.item, this.title, this.text);
			this.text.style.height = '0';
		} else {
			this.add('active', this.item, this.title, this.text);
			this.text.style.height = `${textHeight}px`;
		}
	}

	add(className, ...elems) {
		return elems.forEach(elem => elem.classList.add(className));
	}

	remove(className, ...elems) {
		return elems.forEach(elem => elem.classList.remove(className));
	}
}

export default Spoiler