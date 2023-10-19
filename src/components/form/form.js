import Component from '../../app/js/base/Component';

class Form extends Component {
	constructor(element) {
		super(element);
		this.files = [];

		this.form = element.component;
		this.emailLabel = this.getElement('email-label');
		this.email = this.getElement('email');
		this.emailCheck = this.getElement('email-check');
		this.emailError = document.querySelector('.email-error');

		this.textLabel = this.getElement('text-label');
		this.text = this.getElement('text');
		this.textCheck = this.getElement('text-check');
		this.textError = document.querySelector('.text-error');

		this.fileError = document.querySelector('.file-error');
		this.fileLabel = document.querySelector('.file-label');
		this.preview = document.querySelector('.preview');

		this.checked = document.querySelector('._checked');
		this.submitButton = this.getElement('button-submit');
		this.result = this.getElement('result');

		document.addEventListener('click', this.onClick);

		this.email.addEventListener('blur', this.formValidate);
		this.email.addEventListener('blur', this.emailValidate);
		this.text.addEventListener('keyup', this.emailValidate);

		this.text.addEventListener('blur', this.formValidate);
		this.text.addEventListener('blur', this.textValidate);
		this.text.addEventListener('keyup', this.textValidate);

		this.checked.addEventListener('click', this.formValidate);

		this.fileLabel.addEventListener('change', this.filesUpload);
		this.preview.addEventListener('click', this.removeFile);

		this.form.addEventListener('submit', this.formSend);
    }

  	onClick = (e) => {
		const actives = document.getElementsByClassName('active');

		if (e.composedPath()[0].classList.contains('input') && e.target === document.activeElement) {
			e.target.previousElementSibling.classList.add('active');
		} else {
			[...actives].forEach(elem => elem.classList.remove('active'));
		}
	}

	textValidate = () => {
		if (this.text.value.length > 0) {
			this.textCheck.style.display = 'block';
			this.textError.style.display = 'none';
			this.textLabel.style.opacity = '1';
			this.text.classList.add('checked');
			this.text.classList.remove('error');

			return true;
		} else {
			this.text.classList.add('error');
			this.text.classList.remove('checked');
			this.textError.style.display = 'block';
			this.textError.innerHTML = 'Введите от 1 до 1000 символов';
			this.textCheck.style.display = 'none';

			return false;
		}
	}

	emailValidate = () => {
		const REG_EXP = /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/;

		if (this.email.value.length === 0) {
			this.emailError.style.display = 'none';
			this.email.classList.remove('checked');

			return false;
		} else if (REG_EXP.test(this.email.value)) {
			this.emailCheck.style.display = 'block';
			this.emailLabel.style.opacity = '1';
			this.email.classList.add('checked');
			this.emailError.style.display = 'none';

			return true;
		} else {
			this.emailCheck.style.display = 'none';
			this.emailError.style.display = 'block';
			this.emailError.innerHTML = 'Неправильный email';

			return false;
		}
	}

	formValidate = () => {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let i = 0; i < formReq.length; i++) {
			const input = formReq[i];
			input.classList.remove('_error');

			if (input.value.length === 0) {
				return 
			}

			if (input.classList.contains('_email')) {
				if (!this.emailValidate()) {
					error++;
				} 
			}  

			if (input.classList.contains('_textarea')) {
				 if (!this.textValidate()) {
					error++;
				}
			} 

			if (input.classList.contains('_checked')) {
				if (input.checked === false) {
					error++;
				}
			}
		}
		
		if (error === 0) {
			this.submitButton.classList.add('checked');
			this.submitButton.disabled = false;
		}

		return error;
	}

	formSend = async (e) => {
		e.preventDefault();

		let response = await fetch('/form', {
				method: 'POST',
				body: JSON.stringify({
					email: this.email.value,
					text: this.text.value,
					confirm: true,
					files: this.files
				}),
				headers: {
					'content-type': 'application/json'
			}
		});		

		if (response.ok) {
			this.result.innerHTML = 'Форма успешно отправлена';
			this.result.style.color = '#27AE60';
			this.preview.innerHTML = '';
			this.files = [];
			this.email.value = '';
			this.emailCheck.style.display = 'none';
			this.emailLabel.style.opacity = '0';
			this.text.value = '';
			this.textLabel.style.opacity = '0';
			this.textCheck.style.display ='none';
			this.email.classList.remove('checked');
			this.text.classList.remove('checked');
		} else {
			this.result.innerHTML = 'Ошибка при отправке формы. Попробуйте еще раз';
			this.result.style.color = '#FF0000';
			console.log(response.statusText);
		}
	}

	filesUpload = (e) => {
		function bytesToSize(bytes) {
			const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

			if (!bytes) {
			  return '0 Byte';
			}

			const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

			return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
		}

		if (!e.target.files.length) {
			return
		} else if (e.target.files.length > 2) {
			this.fileError.innerHTML = 'Можно добавить максимум 2 файла';

			return
		}

		this.files = Array.from(e.target.files);
		this.preview.innerHTML = '';

		this.files.forEach(file => {
			const reader = new FileReader();

			reader.onload = () => {
				const name = `${file.name.split('.')[0].substring(0, 12)}...`;
				const extension = file.name.split('.')[1].toUpperCase();
				const size = bytesToSize(file.size);

				if (Math.round(file.size / 1000) > 5000) {
					this.fileError.innerHTML = 'Максимальный размер файла 5 MB';

					return
				}

				this.preview.insertAdjacentHTML('beforeend', `
					<div class='form__button-remove'>
						${name} &nbsp;
						<span class='pdf'>
							${extension}, ${size}
						</span>
						<span class='remove'> 
							<svg data-name="${file.name}" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<mask id="mask0_1_1079" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="20">
								<rect x="0.194336" width="20" height="20" fill="#C4C4C4"/>
								</mask>
								<g mask="url(#mask0_1_1079)">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M5.96928 15L10.2685 10.7008L14.4194 14.8518L15.0461 14.2251L10.8952 10.0741L15.1943 5.77495L14.5676 5.14825L10.2685 9.44742L5.82104 5L5.19434 5.6267L9.64176 10.0741L5.34258 14.3733L5.96928 15Z" fill="#002F6C"/>
								</g>
							</svg>
						</span>	
					</div>
				`)
			}

			reader.readAsDataURL(file);
		})
	}

	removeFile = (e) => {
		if (!e.target.dataset.name) {
			return
		}

		const { name } = e.target.dataset;

		this.files.filter(file => file.name !== name);

		this.preview.querySelector(`[data-name="${name}"]`).closest('.form__button-remove').remove();
	}
}

 
export default Form