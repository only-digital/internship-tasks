import Component from '../../app/js/base/Component';

class Spoiler extends Component {
    constructor(element) {
        super(element);

        // Your code here
        this.item = element.component;
        this.spoilerControl = this.getElement('header');
        this.spoilerBody = this.getElement('body');
        this.root.addEventListener('click', this.onClick);
    }

    // Your code here
    onClick = (e) => {
        const textHeight = this.spoilerBody.scrollHeight;

        if (this.item.classList.contains('active')) {
            this.remove('active', this.item, this.spoilerControl, this.spoilerBody);
            this.spoilerBody.style.height = '0';
        } else {
            this.add('active', this.item, this.spoilerControl, this.spoilerBody);
            this.spoilerBody.style.height = `${textHeight}px`;
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