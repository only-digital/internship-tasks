import Component from '../../app/js/base/Component';

class TextArea extends Component {
	label;
	successIcon;
	errorLabel;
	constructor(element) {
		super(element);

		this.label = this.root.closest('.text-area--wrapper').querySelector('.text-area--label')
		this.successIcon = this.root.closest('.text-area--wrapper').querySelector('svg')

		this.errorLabel = this.root.closest('.text-area--wrapper').nextElementSibling

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

			this.root.classList?.remove('error')
			this.root.classList?.remove('filled')

			this.errorLabel.textContent = ''

		}
		else if (e.target.value.length < 30) {
			this.root.classList.add('error')
			this.root.classList?.remove('filled')
			this.errorLabel.textContent = 'Ваше сообщение должно быть больше 30 символов';

		}

		if (e.target.value.length !== 0 && !this.root.classList.contains('error'))
			this.root.classList.add('filled')

	}
	onInputHandler = (e) => {

		e.target.style.height = "auto"
		e.target.style.height = e.target.scrollHeight + "px"

		if (e.target.value.length >= 30) {
			this.successIcon.classList.add('success')

			this.errorLabel.textContent = ''
			this.root.classList?.remove('error')
		}
		else
			this.successIcon.classList.remove('success')
	}
}

export default TextArea