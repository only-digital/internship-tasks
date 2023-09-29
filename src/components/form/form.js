import Component from '../../app/js/base/Component';

class Form extends Component {

	constructor(element) {
		super(element);

		this.root.addEventListener('submit', (event) => this.onFormSubmit(event));
	}

	onValidate(form) {

		const emailInput = form.querySelector('[name="email"]');
		const checkboxValue = form.querySelector('[name="checkbox"]');
		const textAreaInput = form.querySelector('[name="textarea"]');

		const validateEmailLabel = form.querySelector('.validate__label--email');
		const validateCheckboxLabel = form.querySelector('.validate__label--checkbox');
		const validateTextAreaLabel = form.querySelector('.validate__label--textarea');

		let emailIsValid = true
		let checkboxIsValid = true
		let textAreaIsValid = true

		if (!emailInput.value) {
			validateEmailLabel.textContent = 'Поле E-mail обязательно';
			emailIsValid = false
		}
		else {
			validateEmailLabel.textContent = '';
			emailIsValid = true
		}

		if (!checkboxValue.checked) {
			validateCheckboxLabel.textContent = 'Необходимо отметить соглашение';
			checkboxIsValid = false
		}
		else {
			validateCheckboxLabel.textContent = '';
			checkboxIsValid = true
		}

		if (textAreaInput.value.length < 30) {
			textAreaInput.classList.add('error')
			validateTextAreaLabel.textContent = 'Ваше сообщение должно быть больше 30 символов';
			textAreaIsValid = false
		}
		else {
			textAreaInput.classList.remove('error')
			validateTextAreaLabel.textContent = '';
			textAreaIsValid = true
		}



		return emailIsValid && checkboxIsValid
	}

	async onFormSubmit(event) {
		event.preventDefault();

		const form = event.target;

		const isValidate = this.onValidate(form);

		const emailInput = form.querySelector('[name="email"]');

		const checkboxArea = form.querySelector('.checkbox');
		const checkboxValue = form.querySelector('[name="checkbox"]');

		const submitBtn = form.querySelector('[type="submit"]');

		const successMessage = form.querySelector('.success--msg');
		const errorMessage = form.querySelector('.error--msg');

		if (isValidate) {
			submitBtn.style.display = 'none';
			emailInput.setAttribute('disabled', '');
			checkboxArea.classList.add('disabled');

			await fetch('/form', {
				method: 'POST',
				body: JSON.stringify({
					email: emailInput.value,
					confirm: checkboxValue.checked
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(response => {
				submitBtn.style.display = 'flex';

				if (response.status === 200) {
					submitBtn.style.display = 'none';
					successMessage.classList.add('active');
				}
				if (response.status === 422) {
					emailInput.removeAttribute('disabled');
					checkboxArea.classList.remove('disabled');
					submitBtn.style.display = 'none';
					errorMessage.classList.add('active');

					setTimeout(() => {
						errorMessage.classList.remove('active');
						submitBtn.style.display = 'flex';
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