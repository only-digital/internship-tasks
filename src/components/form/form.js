import Component from '../../app/js/base/Component';

class Form extends Component {
    constructor(element) {
        super(element);

		this.form = element.component;
        this.input = this.getElement('input');
		this.button = this.getElement('button');
		this.emptyEmail = this.getElement('email-empty');
		this.validEmail = this.getElement('email-valid');
		this.result = this.getElement('result');
		this.data = this.getElement('data');
		this.resultText = document.querySelector('.result__text');
		this.resultIcon = document.querySelector('.result__icon');
		this.loader = document.querySelector('.loader-wrapper');

		this.form.addEventListener('submit', this.formSend);
    }

	formSend = async (e) => {
		e.preventDefault();

		let error = this.formValidate(this.form);
		
		if (error === 0) {
			this.loader.classList.add('_sending');

			this.emptyEmail.style.display = 'none';
			this.validEmail.style.display = 'none';
			

			let response = await fetch('/form', {
				method: 'POST',
				body: JSON.stringify({
					email: this.input.value,
					confirm: true  
				}),
				headers: {
					'content-type': 'application/json'
				}
			});	

			let result = await response.json();

			this.result.style.display = 'flex';
			this.resultText.innerHTML = result.message;	

			if (response.ok) {
				this.loader.classList.remove('_sending');
				this.data.classList.add('disabled');

				this.button.style.display = 'none';
			} else {
				this.loader.classList.remove('_sending');
				this.result.classList.add('_error');

				this.resultIcon.children[0].style.display = 'none';
				this.button.style.display = 'flex';
			}
		} 
	};

	formValidate = () => {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let i = 0; i < formReq.length; i++) {
			const input = formReq[i];
			input.classList.remove('_error');

			if (input.classList.contains('_email')) {
				if (input.value.length === 0) {
					input.classList.add('_error');
					this.emptyEmail.style.display = 'block';
					this.validEmail.style.display = 'none';
					error++;
				} else if (!this.emailValidate(input)) {
					input.classList.remove('_error');
					this.emptyEmail.style.display = 'none';
					this.validEmail.style.display = 'block';
					error++;
				} else {
					this.emptyEmail.style.display = 'none';
					this.validEmail.style.display = 'none';
				}
			} else if (input.checked === false) {
				input.classList.add('_error');
				error++;
			} 
		}

		return error;
	}

	emailValidate = (input) => {
		return /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(input.value);
	}
}

export default Form