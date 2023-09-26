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
		this.item.classList.toggle('active');
		this.title.classList.toggle('active');
		this.text.classList.toggle('active');
	}
}

export default Spoiler