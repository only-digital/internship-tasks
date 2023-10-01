import Component from '../../app/js/base/Component';


class Form extends Component {
	emailInput;
	checkbox;
	textArea;
	files;

	submitBtn;

	validateCheckboxLabel;
	validateEmailLabel;
	validateTextAreaLabel;

	successMessage;
	errorMessage;

	constructor(element) {
		super(element);

		this.emailInput = this.root.querySelector('[name="email"]');
		this.checkbox = this.root.querySelector('[name="checkbox"]');
		this.textArea = this.root.querySelector('[name="textarea"]');
		this.files = this.root.querySelector('[name="file-upload"]');

		this.submitBtn = this.root.querySelector('[type="submit"]');

		this.validateEmailLabel = this.root.querySelector('.validate__label--email');
		this.validateCheckboxLabel = this.root.querySelector('.validate__label--checkbox');
		this.validateTextAreaLabel = this.root.querySelector('.validate__label--textarea');

		this.successMessage = this.root.querySelector('.success--msg');
		this.errorMessage = this.root.querySelector('.error--msg');

		this.root.addEventListener('submit', this.onFormSubmit.bind(this));
	}

	onValidate() {

		let emailIsValid = true
		let checkboxIsValid = true
		let textAreaIsValid = true
		let filesIsValid = true

		if (!this.emailInput.value) {
			this.validateEmailLabel.textContent = 'Поле E-mail обязательно';
			emailIsValid = false
		}
		else {
			this.validateEmailLabel.textContent = '';
			emailIsValid = true
		}

		if (!this.checkbox.checked) {
			this.validateCheckboxLabel.textContent = 'Необходимо отметить соглашение';
			checkboxIsValid = false
		}
		else {
			this.validateCheckboxLabel.textContent = '';
			checkboxIsValid = true
		}

		if (this.textArea.value.length < 30) {
			this.textArea.classList.add('error')
			this.validateTextAreaLabel.textContent = 'Ваше сообщение должно быть больше 30 символов';
			textAreaIsValid = false
		}
		else {
			this.textArea.classList.remove('error')
			this.validateTextAreaLabel.textContent = '';
			textAreaIsValid = true
		}

		if (this.files.files.length > 2) {
			filesIsValid = false
		}

		return emailIsValid && checkboxIsValid && textAreaIsValid && filesIsValid
	}

	async onFormSubmit(event) {

		event.preventDefault();

		const form = event.target;

		const isValidate = this.onValidate();

		if (isValidate) {
			this.submitBtn.style.display = 'none';

			this.emailInput.setAttribute('disabled', '');
			this.textArea.setAttribute('disabled', '');
			this.checkbox.setAttribute('disabled', '');

			this.files.parentNode.classList.add('disabled');

			const formData = new FormData();
			formData.append('email', this.emailInput.value);
			formData.append('message', this.textArea.value);

			if (this.files.files.length > 0)
				formData.append('files', ...this.files.files);

			formData.append('confirm', this.checkbox.checked);

			await fetch('/form', {
				method: 'POST',
				body: formData,
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(response => {
				this.submitBtn.style.display = 'flex';

				if (response.status === 200) {
					this.submitBtn.style.display = 'none';

					this.successMessage.classList.add('active');
				}
				if (response.status === 422) {
					this.emailInput.removeAttribute('disabled');
					this.textArea.removeAttribute('disabled');
					this.checkbox.removeAttribute('disabled');

					this.files.parentNode.classList.remove('disabled');

					this.submitBtn.style.display = 'none';

					this.errorMessage.classList.add('active');

					setTimeout(() => {
						this.errorMessage.classList.remove('active');
						this.submitBtn.style.display = 'flex';
					}, 3000)

					form.reset()
				}
			}).catch(error => {
				console.error(error)
			})
		}
	}
}

export default Form