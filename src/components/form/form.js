import Component from '../../app/js/base/Component';

class Form extends Component {

	constructor(element) {
		super(element);

		this.root.addEventListener('submit', (event) => this.onFormSubmit(event));
	}

	onValidate(form) {

		const emailInput = form.querySelector('[name="email"]');
		const checkboxValue = form.querySelector('[name="checkbox"]');

		const validateEmailLabel = form.querySelector('.validate__label--email');
		const validateCheckboxLabel = form.querySelector('.validate__label--checkbox');

		let emailIsValid = true
		let checkboxIsValid = true

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

		const successMessage = form.querySelector('.success');
		const errorMessage = form.querySelector('.error');

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