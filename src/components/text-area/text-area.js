import Component from '../../app/js/base/Component';

class TextArea extends Component {
	label;
	successIcon;
	errorLabel;
    constructor(element) {
        super(element);

		  this.label = this.root.previousElementSibling
		  this.successIcon = this.root.nextElementSibling

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
		if (e.target.value === '')
			this.label.classList.remove('focus')
	}
	onInputHandler = (e) => {
		if (e.target.value.length > 1024) 
			e.target.value = e.target.value.slice(0, 1024)
		
		e.target.style.height = "auto"
		e.target.style.height = e.target.scrollHeight + "px"

		if (e.target.value.length >= 30) {
			this.successIcon.classList.add('success')
			this.errorLabel.textContent = ''
			
			if (this.root.classList.contains('error'))
				this.root.classList.remove('error')
		}
		else 
			this.successIcon.classList.remove('success')
		

	}
}

export default TextArea