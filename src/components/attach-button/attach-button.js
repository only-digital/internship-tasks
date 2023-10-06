import Component from '../../app/js/base/Component';
import validateForm from '../../helpers/validateForm';

class AttachButton extends Component {
    feedbackForm
    attachButton
    fileTabs
    noticeElement
    errorField
    submitButton
    files

    constructor(element) {
        super(element);

        this.feedbackForm = document.querySelector('.feedback-form__controls');
        this.feedbackForm.addEventListener('submit', this.handleCaptureFiles, true)

        this.attachButton = this.getElement('input');
        this.attachButton.addEventListener('change', this.handleAttachClick);

        this.fileTabs = this.getElement('file-tabs');

        this.noticeElement = this.getElement('notice');

        this.errorField = this.getElement('error-field');

        this.submitButton = document.querySelector('.submit-button');

        this.files = [];
    }

    createAttachedFileTab = (name, size) => {
        const [filename, format] = name.split('.');
        const displayedName = filename.length > 15 ? filename.slice(0, 16) + '...' : filename;
        const formatAndSize = `${format.toUpperCase()}, ${this.convertFileSize(size)}`;

        this.root.style.gap = this.files.length > 1 ? '20px' : '32px';
 
        const wrapper = document.createElement('div');
        wrapper.classList.add('selected-file');

        const filenameEl = document.createElement('span');
        filenameEl.classList.add('selected-file__name');
        filenameEl.innerHTML = displayedName;

        const formatEl = document.createElement('span');
        formatEl.classList.add('selected-file__format');
        formatEl.innerHTML = formatAndSize;

        const removeButton = document.createElement('button');
        removeButton.classList.add('selected-file__remove-button');
        removeButton.addEventListener('click', (e) => this.removeAttachedFileTab(e, name, wrapper));

        wrapper.appendChild(filenameEl);
        wrapper.appendChild(formatEl);
        wrapper.appendChild(removeButton);

        this.fileTabs.appendChild(wrapper);
    }

    removeAttachedFileTab = (e, filename, element) => {
        e.preventDefault();
        const filteredList = this.files.filter(({ name }) => name !== filename);
        this.files = filteredList;
        element.remove();
        this.root.style.gap = '32px';
    }

    convertFileSize = (size) => {
        if (size < 1024) {
            return `${size} B`
        } else if (size >= 1024 && size < Math.pow(1024, 2)) {
            return `${(size / 1024).toFixed(1)} kB`
        } else if (size >= Math.pow(1024, 2)) {
            return `${(size / Math.pow(1024, 2)).toFixed(1)} MB`
        }
    }

    validateSize = (file) => {
        const sizeInMb = file.size / Math.pow(1024, 2);
        if (sizeInMb > 5) {
            this.errorField.textContent = 'Максимальный размер файла 5 MB';
            return false;
        } else {
            return true
        }
    }

    handleAttachClick = (e) => {
        this.errorField.textContent = '';
        switch(e.target.files.length) {
            case 1: {
                if (this.files.length <= 1 && this.validateSize(e.target.files[0])) {
                    this.files.push(e.target.files[0]);
                } else if (!this.validateSize(e.target.files[0])) {
                    return validateForm();
                } else {
                    return this.handlePopOver();
                }
            }
                break;
            case 2: {
                if (this.files.length > 0) {
                    return this.handlePopOver();
                } else {
                    for (const file of e.target.files) {
                        if (!this.validateSize(file)) {
                            return validateForm();
                        } else {
                            this.files.push(file);
                        }
                    }
                }
            }
                break;
            default: break;
        }
        this.fileTabs.innerHTML = '';
        
        this.files.forEach(({ name, size }) => this.createAttachedFileTab(name, size));
        validateForm();
    }

    handleCaptureFiles = (e) => {
        e.preventDefault()
        e.files = this.files;
    }

    handlePopOver = () => {
        this.noticeElement.classList.add('active');
        setTimeout(() => {
            this.noticeElement.classList.remove('active');
        }, 2000)
    }

}

export default AttachButton