import Component from '../../app/js/base/Component';

class InputField extends Component {
	_reg = /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/;

	label;
	successIcon;
	errorLabel;

	constructor(element) {
		super(element);

		this.label = this.root.closest('.input-field--wrapper').querySelector('.input-field--label')
		this.successIcon = this.root.closest('.input-field--wrapper').querySelector('svg')

		this.errorLabel = this.root.closest('.input-field--wrapper').nextElementSibling

		this.root.addEventListener('input', this.onInputHandler)
		this.root.addEventListener('focus', this.onFocusHandler)
		this.root.addEventListener('blur', this.onBlurHandler)
	}

	onFocusHandler = () => {
		this.label.classList.add('focus')
	}

	onBlurHandler = (e) => {
		e.target.value = e.target.value.trim()

		if (e.target.value === '') {
			this.label.classList.remove('focus')

			this.errorLabel.textContent = ''
			this.root.classList?.remove('error')
			this.root.classList?.remove('filled')
		}
		else if (!this._reg.test(e.target.value)) {
			this.root.classList.add('error')
			this.root.classList?.remove('filled')

			this.errorLabel.textContent = 'Введен некорректный e-mail';
		}

		if (e.target.value.length !== 0 && !this.root.classList.contains('error'))
			this.root.classList.add('filled')
	}

	onInputHandler = (e) => {

		e.target.style.height = "auto"
		e.target.style.height = e.target.scrollHeight + "px"

		if (this._reg.test(e.target.value)) {
			this.successIcon.classList.add('success')
			this.errorLabel.textContent = ''

			this.root.classList?.remove('error')
		}
		else
			this.successIcon.classList.remove('success')
	}
}

export default InputField

