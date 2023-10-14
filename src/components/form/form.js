import Component from '../../app/js/base/Component';

class Form extends Component {
    constructor(element) {
        super(element);

		this.form = element.component;
		this.emailLabel = this.getElement('email-label');
		this.email = this.getElement('email');
		this.emailCheck = this.getElement('email-check');
		this.textLabel = this.getElement('text-label');
		this.text = this.getElement('text');

		document.addEventListener('click', this.onClick);
		this.email.addEventListener('keydown', this.emailValidation);
    }

    onClick = (e) => {
		const actives = document.getElementsByClassName('active');

		if (e.composedPath()[0].classList.contains('input') && e.target === document.activeElement) {
			e.target.previousElementSibling.classList.add('active');
		} else {
			[...actives].forEach(elem => elem.classList.remove('active'));
		}
	}

	emailValidation = () => {
		const REG_EXP = /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/;
	
		if (this.email.value.length <= 255 && REG_EXP.test(this.email.value)) {
			this.emailCheck.style.display = 'block';
			this.email.style.backgroundColor = '#F4F4F4';
			this.email.style.border = 'none';
		}
	}
}

export default Form