import Component from '../../app/js/base/Component';

class FeedbackForm extends Component {
    URL;
    inputEl;
    inputValue;
    checkboxEl;
    checkboxLabelEl;
    checkboxLinkEl;
    buttonSubmitEl;
    formEl;
    isChecked;
    buttonSuccessfulEl;
    fieldNameEl;
    inputFileEl;
    regex;
    loadedFile;
    loadedFileName;
    loadedFileSize;
    fileName = [];
    fileSize = [];
    fileType = [];
    fileNameSingle;
    fileSizeSingle;
    fileTypeSingle;
    fileCloseIcon = [];
    isCorrectSize;
    uploadInput;
    addFileButton;
    emailFieldEl;
    errorFileEl;
    errorInputEl;
    errorTextEl;
    errorButton;
    errorCheckboxEl;
    isValid = false;
    textFieldEl;
    filesSizeArray = [];
    filesArray;
    allowedTypes;
    uploadedElInfo;
    constructor(element) {
        super(element);
        this.URL = '/form';
        this.allowedTypes = ['application/msword','application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        this.regex = new RegExp('^([a-zA-Z\\-0-9_]+|([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)+)|(".+"))@(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z\\-0-9]{2,})$');

        this.loadedFile = this.getElements('file-uploads');
        this.uploadInput = this.getElement('file-button');
        this.loadedFileName = this.getElements('file-uploads-name');
        this.addFileButton = this.getElement('file-label');
        this.loadedFileSize = this.getElements('file-uploads-size');
        this.fileCloseIcon = this.getElements('file-uploads-icon');
        this.emailFieldEl = this.getElement('input-field')
        this.checkboxEl = this.getElement('checkbox-item');
        this.fieldNameEl = this.getElement('name');
        this.buttonSubmitEl = this.getElement('button');
        this.checkboxLabelEl = this.getElement('checkbox-name');
        this.checkboxLinkEl = this.checkboxLabelEl.firstElementChild;
        this.formEl = this.getElement('form');
        this.inputEl = this.getElement('field');

        this.errorFileEl = this.getElement('message-file');
        this.errorInputEl = this.getElement('message-input');
        this.errorTextEl = this.getElement('message-textarea');
        this.errorCheckboxEl = this.getElement('message-checkbox');
        this.errorButton = this.getElement('message-button');

        this.checkboxEl = this.getElement('checkbox-item');
        this.textFieldEl = this.getElement('textarea-element');

        this.buttonSuccessfulEl = this.getElement('button-successful');
        this.inputFileEl = this.getElement('file-button');

        this.emailFieldEl.addEventListener('blur', this.validateEmail);
        this.textFieldEl.addEventListener('blur', this.validateTextField);
        this.inputFileEl.addEventListener('change', this.onLoadFile);
        this.checkboxEl.addEventListener('change', this.validateCheckbox);

    }
    checkTheFields = () => {
        this.checkboxEl.checked ? this.isChecked = true : this.isChecked = false;

        if (!this.isChecked || !this.isValid || this.textFieldEl.value === '' || this.uploadInput.files.length < 1) {
            this.buttonSubmitEl.classList.add('not-active');
            this.errorButton.classList.remove('success');
            this.errorButton.innerText = 'Заполните все поля для отправки формы!'
        } else {
            this.errorButton.innerText = '';
            this.buttonSubmitEl.classList.remove('not-active');
            this.formEl.addEventListener('submit', this.submitForm);
            return true
        }
    }
    validateCheckbox = () => {
        this.checkboxEl.checked ? this.errorCheckboxEl.innerText = '' : this.errorCheckboxEl.innerText = 'Нужно согласиться с политикой обработки персональных данных!';
        this.checkTheFields();
    }
    validateEmail = () => {
        this.inputValue = this.emailFieldEl.value;

        if (this.regex.test(this.inputValue) && this.inputValue !== '' && this.inputValue.length > 1 && this.inputValue.length <= 255) {
            this.errorInputEl.classList.add('success')
            this.errorFileEl.innerText = ''
            this.errorInputEl.innerText = 'Поле Email заполнено верно!';
            this.isValid = true;
        } else {
            this.errorInputEl.classList.remove('success')
            this.errorFileEl.innerText = ''
            this.errorInputEl.innerText = 'Поле Email заполнено не верно!';
            this.emailFieldEl.addEventListener('keydown', (e) => {
                this.emailFieldEl.value = '';
            })
            this.isValid = false;

            this.emailFieldEl.addEventListener('focus', () => {
                this.errorInputEl.innerText = ''
            })
        }
        this.checkTheFields();
    }
    validateTextField = () => {
        if (this.textFieldEl.value !== '') {
            this.errorTextEl.classList.add('success')
            this.errorTextEl.innerText = 'Поле заполнено верно!';
            this.textFieldEl.addEventListener('focus', () => {
                this.errorTextEl.innerText = ''
            })
        } else {
            this.errorTextEl.classList.remove('success')
            this.errorTextEl.innerText = 'Поле не должно быть пустым! Максимальное количество символов - 1000.'
            }
        this.checkTheFields();
    }

    checkFileSizeMultiple = (size) => {
        size.forEach((el, index) => {
            if (el > 5 * 1024 * 1024) {
                this.errorFileEl.innerText = 'Размер файла не должен превышать 5 Мб';
                this.isCorrectSize = false;
            } else if (el > 1024) {
                this.fileSize.push(`${Math.round(el / 1024)} kB`)
            } else {
                this.fileSize.push(`${Math.round(el)} b`)
            }
        });
    }
    checkFileSizeSingle = (size) => {
        if (size > 5 * 1024 * 1024) {
            this.errorFileEl.classList.remove('success');
            this.errorFileEl.innerText = 'Размер файла не должен превышать 5 Мб';
            this.isCorrectSize = false;
            this.loadedFile.value = '';
        } else if (size > 1024) {
            this.fileSizeSingle = `${Math.round(size / 1024)} kB`;
        } else {
            this.fileSizeSingle = `${Math.round(size)} b`;
        }
    }

    getFilesInfo = (files) => {
        files.forEach((file) => {
            this.fileName.push(file.name);
            this.fileType.push(file.type);
            this.filesSizeArray.push(file.size);
        })
    }


    uploadMultiple = (files) => {
        this.getFilesInfo(this.filesArray);
        this.checkFileSizeMultiple(this.filesSizeArray);

        if (this.isCorrectSize) {
            this.uploadedElInfo = this.filesArray.map((el,index) => {
                this.checkFileSizeSingle(el.size);
                return [el.name, this.fileSize[index]]
            })

            this.fileType.forEach((type) => {
                if (this.allowedTypes.includes(type)) {
                    this.loadedFile.forEach((contentBlock, index) => {
                        contentBlock.classList.remove('hidden');
                        let elemChildren = [...contentBlock.children];
                        elemChildren[0].innerText = this.uploadedElInfo[index][0];
                        elemChildren[1].innerText = this.uploadedElInfo[index][1];
                        this.checkLimitUploads();
                    })
                    this.closeLoadedFilePreviewMultiple(files);
                }
            })
        }
    }
    uploadOneByOne = (files) => {
        this.fileNameSingle = files[0].name;
        this.fileSizeSingle = files[0].size;
        this.fileTypeSingle = files[0].type;
        this.checkFileSizeSingle(this.fileSizeSingle);

        if (this.isCorrectSize) {
            if (this.allowedTypes.includes(this.fileTypeSingle)) {
                this.errorFileEl.innerText = '';
                this.showLoadedElement(0, 1, this.loadedFile, this.loadedFileName, this.loadedFileSize );
                this.checkLimitUploads();
                this.closeLoadedFilePreview();
            } else {
                this.errorFileEl.classList.remove('success');
                this.errorFileEl.innerText = 'Формат файла не поддерживается!';
            }
        }
    }

    showLoadedElement = (index1, index2, blockName, fileName, fileSize ) => {
        if (blockName[index1].classList.contains('hidden')) {
            blockName[index1].classList.remove('hidden');
            fileName[index1].innerText = `${this.fileNameSingle}, `;
            fileSize[index1].innerText = this.fileSizeSingle;
        } else {
            blockName[index2].classList.remove('hidden');
            fileName[index2].innerText = `${this.fileNameSingle}, `;
            fileSize[index2].innerText = this.fileSizeSingle;
        }
    }

    checkLimitUploads = () => {
        if (!this.loadedFile[0].classList.contains('hidden') && !this.loadedFile[1].classList.contains('hidden')) {
            this.errorFileEl.innerText = 'Вы достигли лимита по количеству загружаемых файлов!';
            this.errorFileEl.classList.add('success');
            this.inputFileEl.disabled = true;
        } else {
            this.inputFileEl.disabled = false;
            this.errorFileEl.classList.remove('success');
            this.errorFileEl.innerText = 'Максимальное количество файлов - 2';
        }
    }

    closeLoadedFilePreview = () => {
        this.fileCloseIcon.forEach((elem, index) => {
            elem.addEventListener('click', (e) => {
                this.loadedFile[index].classList.add('hidden');
                this.inputFileEl.files.value = '';
                this.inputFileEl.disabled = false;
                this.errorFileEl.classList.remove('success');
                this.errorFileEl.innerText = 'Максимальное количество файлов - 2';
            })
        })
    }
    closeLoadedFilePreviewMultiple = (files) => {
        this.fileCloseIcon.forEach((elem) => {
            elem.addEventListener('click', (e) => {
                e.target.parentElement.classList.add('hidden');
                files.splice(e.target.parentElement.dataset.upload - 1, 1);
                this.checkLimitUploads();
            })
        })
    }

    onLoadFile = () => {
        this.isCorrectSize = true;
        this.filesArray = Object.values(this.inputFileEl.cloneNode(true).files);

        if (this.filesArray.length === 2) {
            this.uploadMultiple(this.filesArray);
        } else if (this.filesArray.length < 2) {
            this.uploadOneByOne(this.filesArray);
        } else {
            this.errorFileEl.innerText = 'Вы можете загрузить не больше 2 файлов!';
        }
        this.checkTheFields();
    }

    submitForm = async(e) => {
        e.preventDefault();

        this.inputFileEl.disabled = false;
        let formData = new FormData(this.formEl);

        if (this.checkTheFields()) {
            this.buttonSubmitEl.classList.remove('not-active');
            this.errorButton.innerText = '';

            fetch(this.URL, {
                method: 'POST',
                body: formData,
            })
            .then(response => {
                response.ok ? this.successReaction() : this.errorReaction();
            })
        }
    }
    successReaction = () => {
        this.errorButton.classList.add('success');
        this.errorButton.innerText = 'Данные успешно отправлены!';
        setTimeout(() => {
            this.formEl.reset();
            this.errorInputEl.innerText = '';
            this.errorFileEl.innerText = '';
            this.errorTextEl.innerText = '';
            this.errorCheckboxEl.innerText = '';
            this.loadedFile.forEach((e) => {
                e.classList.add('hidden');
                let children = [...e.children];
                children.forEach((element) => {
                    element.innerText = '';
                })
            });
            this.filesArray = [];
            this.buttonSubmitEl.classList.add('not-active');
        },1000)

    }
    errorReaction = () => {
        this.errorButton.classList.remove('success');
        this.errorButton.innerText = 'При отправке данных произошла ошибка!';
    }
}

export default FeedbackForm