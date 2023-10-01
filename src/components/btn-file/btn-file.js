import Component from '../../app/js/base/Component';

class BtnFile extends Component {

	//*  список отображаемых файлов в ul.file-list
	fileList;

	label;

	errorLabel;

	files = [];
	constructor(element) {
		super(element);

		this.fileList = this.root.closest(".btn-file__wrapper").querySelector('.file-list');

		this.label = this.root.parentNode;

		this.errorLabel = this.root.closest(".btn-file__wrapper").nextElementSibling;

		this.root.addEventListener('change', this.handleFileUpload);
	}

	handleFileUpload = (event) => {

		const eSizeMessage = 'Размер загружаемого файла не должен превышать 5МБ';
		const eCountMessage = 'Нельзя загрузить больше двух файлов';

		if (this.files.length === 2) {
			event.preventDefault();
			this.errorLabel.textContent = eCountMessage;

			return;
		}

		const files = event.target.files;
		const maxFileSize = 5 * 1024 * 1024; // 5MB
		const maxFileCount = 2;

		this.root.removeAttribute('disabled');


		if (files.length > maxFileCount) {
			event.preventDefault();
			this.errorLabel.textContent = eCountMessage;
			return;
		}

		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			if (file.size > maxFileSize) {
				event.preventDefault();
				this.errorLabel.textContent = eSizeMessage;
				return;
			}

			if (this.files.length < 2) {

				this.fileList.appendChild(this.createFileItem(file));

				this.files.push(file);
			}


		}

		if (this.files.length === 2)
			this.label.classList.add('disabled')
		else
			this.label.classList.remove('disabled')

		this.errorLabel.textContent = '';
	}

	createFileItem(file) {
		const fileType = `.${file.name.split(".")[1]}`;
		const fileSize = Math.round(file.size / 1024) // kB

		const listItem = document.createElement('li');

		listItem.classList.add('file-list__item');
		listItem.innerHTML = `Документ <span> ${fileType}, ${fileSize} kB</span>`

		listItem.addEventListener('click', () => {
			if (this.label.classList.contains('disabled'))
				return

			const currentFile = file
			this.fileList.removeChild(listItem)
			this.files = this.files.filter((item) => item !== currentFile)

			this.label.classList?.remove('disabled')
		})

		return listItem
	}
}

export default BtnFile