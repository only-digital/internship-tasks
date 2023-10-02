import Component from '../../app/js/base/Component';

class Form extends Component {
	isLoading = false;

    constructor(element) {
        super(element);

		this.form = element.component;
        this.input = this.getElement('input');
		this.button = this.getElement('button');
		this.empty = this.getElement('empty');
		this.valid = this.getElement('valid');
		this.warning = this.getElement('warning');
		this.success = this.getElement('success');

		// this.button.addEventListener('click', this.sendData);
		this.form.addEventListener('submit', this.formSend);
    }

	formSend = async (e) => {
		e.preventDefault();

		let error = this.formValidate(this.form);
		
		if (error === 0) {
			let response = await fetch('/form', {
				method: 'POST',
				body: JSON.stringify({
					email: this.input.value,
					confirm: true  
				}),
				headers: {
					'content-type': 'application/json'
				}
			})
			console.log(1)
			if (response.ok) {
				let result = await response.json();

				this.button.style.display = 'none';
				this.success.style.display = 'flex';
				this.form.setAttribute('disabled', true);
			} else {

			}
		} else {

		}
	}

	formValidate = (form) => {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let i = 0; i < formReq.length; i++) {
			const input = formReq[i];
			this.formRemoveError(input);

			if (input.classList.contains('_email')) {
				if (input.value.length === 0) {
					this.formAddError(input);
					this.empty.style.display = 'block';
					this.valid.style.display = 'none';
					error++;
				} else if (!this.emailValidate(input)) {
					this.formAddError(input);
					this.empty.style.display = 'none';
					this.valid.style.display = 'block';
					error++;
				}	
			} else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
				this.formAddError(input);
				error++;
			}
		}

		return error;
	}

	formAddError = (input) => {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}	
	
	formRemoveError = (input) => {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}	

	emailValidate = (input) => {
		return /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(input.value);
	}
}

export default Form

// sendData = async (e) => {
// 	e.preventDefault();

// 	if (this.input.value.length === 0) {
// 		this.empty.style.display = 'block';
// 	} else {
// 		e.preventDefault();

// 		this.empty.style.display = 'none';

// 		// const warning = document.createElement('p');
// 		// warning.classList.add('warning');

// 		const response = await fetch('/form', {
// 			method: 'POST',
// 			body: JSON.stringify({
// 				email: this.input.value,
// 				confirm: true  
// 			}),
// 			headers: {
// 				'content-type': 'application/json'
// 			}
// 		})
// 		let result = await response.json();

// 		console.log(result)
// 		if (response.ok) {
// 			this.warning.innerHTML = result.message;
// 			this.warning.style.color = 'green';
// 			// this.form.appendChild(warning);
// 		} else {
// 			this.warning.innerHTML = result.message;
// 			this.warning.style.color = 'red';
// 			this.form.appendChild(warning);
// 		}
// 	}
// }

// addResult = (className) => {
// 	result.innerHTML = response.message;
// 	result.style.color = className;
// 	this.form.appendChild(result);
// }