import Component from '../../app/js/base/Component';

class Form extends Component {
    constructor(element) {
        super(element);

		this.form = element.component;
		this.emailLabel = this.getElement('email-label');
		this.email = this.getElement('email');
		this.emailCheck = this.getElement('email-check');
		this.emailError = document.querySelector('.email-error');

		this.textLabel = this.getElement('text-label');
		this.text = this.getElement('text');
		this.textCheck = this.getElement('text-check');
		this.textError = document.querySelector('.text-error');

		document.addEventListener('click', this.onClick);
		this.email.addEventListener('blur', this.emailValidation);
		this.text.addEventListener('blur', this.textValidation);

		this.form.addEventListener('submit', this.formValidation);
    }

    onClick = (e) => {
		const actives = document.getElementsByClassName('active');

		if (e.composedPath()[0].classList.contains('input') && e.target === document.activeElement) {
			e.target.previousElementSibling.classList.add('active');
		} else {
			[...actives].forEach(elem => elem.classList.remove('active'));
		}
	}

	textValidation = () => {
		if (this.text.value.length > 0) {
			this.textCheck.style.display = 'block';
			this.textLabel.style.opacity = '1';
			this.text.style.height = '172px';
			this.text.style.backgroundColor = '#F4F4F4';
			this.text.style.borderRadius = '24px';
			this.text.style.padding = '12px 50px 16px 20px';
			this.text.classList.remove('error');
			this.textError.style.display = 'none';
		} else {
			this.text.classList.add('error');
			this.textError.innerHTML = 'Введите от 1 до 1000 символов';
		}
	}

	emailValidation = () => {
		const REG_EXP = /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/;
	
		if (REG_EXP.test(this.email.value)) {
			this.emailCheck.style.display = 'block';
			this.emailLabel.style.opacity = '1';
			this.email.style.backgroundColor = '#F4F4F4';
			this.email.style.border = 'none';
			this.email.style.borderRadius = '24px';
			this.email.style.padding = '14px 20px';
			this.emailError.style.display = 'none';
		} else {
			this.emailError.innerHTML = 'Неправильный email'
		}
	}

	formValidation = () => {

	}
}

export default Form