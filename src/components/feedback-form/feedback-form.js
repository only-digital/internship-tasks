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
    loaderEl;
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
    constructor(element) {
        super(element);

        this.URL = '/form';
        this.regex = new RegExp('^([a-zA-Z\\-0-9_]+|([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)+)|(".+"))@(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z\\-0-9]{2,})$');

        this.loadedFile = this.getElements('file-uploads');
        // this.loadedFileData = this.getElement('file-uploads-1')
        this.uploadInput = this.getElement('file-button');
        this.loadedFileName = this.getElements('file-uploads-name');
        this.addFileButton = this.getElement('file-label');

        this.loadedFileSize = this.getElements('file-uploads-size');

        // this.loadedFileMimeType = this.getElement('file-uploads-type');

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

        // this.errorBlockEl.innerText = 'text'
        // console.log(this.errorBlockEl)
        this.buttonSuccessfulEl = this.getElement('button-successful');
        this.loaderEl = this.getElement('loader');
        this.inputFileEl = this.getElement('file-button');
        // console.dir(this.inputFileEl)
        this.emailFieldEl.addEventListener('blur', this.validateEmail)
        this.textFieldEl.addEventListener('blur', this.validateTextField)
        this.inputFileEl.addEventListener('change', this.onLoadFile, true)

        this.checkboxEl.addEventListener('change', this.validateCheckbox)

    }
    checkTheFields = () => {
        console.log(this.isChecked)
        console.log(this.isValid)
        console.log(this.textFieldEl.value)
        console.log(this.uploadInput.files.length)
        this.checkboxEl.checked ? this.isChecked = true : this.isChecked = false;

        if (!this.isChecked || !this.isValid || this.textFieldEl.value === '' || this.uploadInput.files.length < 1) {
            console.log('no')
            this.buttonSubmitEl.classList.add('not-active');
            this.errorButton.classList.remove('success');
            this.errorButton.innerText = 'Заполните все поля для отправки формы!'

        } else {
            console.log('yes')
            this.errorButton.innerText = '';
            this.buttonSubmitEl.classList.remove('not-active');
            this.formEl.addEventListener('submit', this.submitForm);
            return true
        }

    }
    validateCheckbox = () => {

        if (!this.checkboxEl.checked) {

            this.errorCheckboxEl.innerText = 'Нужно согласиться с политикой обработки персональных данных!'
        } else {
            this.errorCheckboxEl.innerText = ''

        }
        this.checkTheFields();
    }
    validateEmail = () => {
        console.log('blur');
        this.inputValue = this.emailFieldEl.value;
        if (this.regex.test(this.inputValue) && this.inputValue !== '' && this.inputValue.length > 1 && this.inputValue.length <= 255) {
            this.errorInputEl.classList.add('success')
            this.errorFileEl.innerText = ''
            this.errorInputEl.innerText = 'Поле Email заполнено верно!'
            this.isValid = true;

        } else {
            this.errorInputEl.classList.remove('success')
            this.errorFileEl.innerText = ''
            this.errorInputEl.innerText = 'Поле Email заполнено не верно!'
            this.emailFieldEl.value = '';
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
            this.errorTextEl.innerText = 'Поле заполнено верно!'
        } else {
            this.errorTextEl.classList.remove('success')
            this.errorTextEl.innerText = 'Поле не должно быть пустым! Максимальное количество символов - 1000.'
            this.textFieldEl.addEventListener('focus', () => {
                this.errorTextEl.innerText = ''
            })

        }
        this.checkTheFields();
    }
    checkFileSizeMultiple = (size) => {
        size.forEach((el, index) => {
            if (el > 5 * 1024 * 1024) {
                console.log('размер файла не должен превышать 5 Мб');
                this.errorFileEl.innerText = 'Размер файла не должен превышать 5 Мб';
                this.isCorrectSize = false;
                this.loadedFile.value = '';
                this.fileName = this.fileName.slice(index + 1);
                this.fileType = this.fileType.slice(index + 1);
            } else if (el > 1024) {
                this.fileSize.push(`${Math.round(el / 1024)} kB`)
            } else {
                this.fileSize.push(`${Math.round(el)} b`)
            }
        });
    }
    checkFileSizeSingle = (size) => {
        if (size > 5 * 1024 * 1024) {
            console.log('размер файла не должен превышать 5 Мб');
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
        this.getFilesInfo(files);
        this.checkFileSizeMultiple(this.filesSizeArray);


        if (this.isCorrectSize) {
            console.log('загрузка файла')
            this.fileType.forEach((type) => {
                if (['application/msword','application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(type)) {
                    this.errorFileEl.innerText = ''

                    let docName = [];
                    docName = this.fileName.map((name, index) => {

                        this.loadedFileSize[index].parentElement.classList.remove('hidden');

                        this.fileCloseIcon[index].addEventListener('click', (e) => {

                            this.loadedFileSize[index].parentElement.classList.add('hidden');
                            files[index].value = ''
                            console.log(files)
                        })
                        return this.loadedFileName[index].innerText = `${name}, `;
                    });
                    let docSize = [];
                    docSize = this.fileSize.map((size, index) => {
                        this.loadedFileSize[index].parentElement.classList.remove('hidden');
                        return this.loadedFileSize[index].innerText = size;
                    })

                } else {
                    console.log(`Формат файла не поддерживается!`)
                    this.errorFileEl.innerText = 'Формат файла не поддерживается!';
                }
            })
            console.log(files)

        }
    }
    uploadOneByOne = (files) => {

        if (!this.loadedFile[0].classList.contains('hidden') && !this.loadedFile[0].classList.contains('hidden')) {
            this.errorFileEl.innerText = 'Вы достигли лимита по количеству загружаемых файлов!';
            this.errorFileEl.classList.add('success');
            // this.inputFileEl.removeEventListener('change', this.onLoadFile, false)
        }

        this.fileNameSingle = files[0].name;
        this.fileSizeSingle = files[0].size;
        this.fileTypeSingle = files[0].type;
        this.checkFileSizeSingle(this.fileSizeSingle);

        console.log(this.fileNameSingle + this.fileSizeSingle + this.fileTypeSingle)


        if (this.isCorrectSize) {
            if (this.fileTypeSingle === 'application/msword' || this.fileTypeSingle === 'application/pdf' || this.fileTypeSingle === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                console.log(this.loadedFile)
                this.errorFileEl.innerText = ''
                if (this.loadedFile[0].classList.contains('hidden')) {
                    this.loadedFile[0].classList.remove('hidden');
                    this.loadedFileName[0].innerText = `${this.fileNameSingle}, `;
                    this.loadedFileSize[0].innerText = this.fileSizeSingle;
                } else {
                    this.loadedFile[1].classList.remove('hidden');
                    this.loadedFileName[1].innerText = `${this.fileNameSingle}, `;
                    this.loadedFileSize[1].innerText = this.fileSizeSingle;

                }



                this.fileCloseIcon.forEach((elem, index) => {
                    elem.addEventListener('click', (e) => {
                        this.loadedFile[index].classList.add('hidden');
                        this.inputFileEl.files.value = '';
                    })
                })
            } else {
                console.log(`Формат файла не поддерживается!`)
                this.errorFileEl.innerText = 'Формат файла не поддерживается!';
            }
        }
    }
    onLoadFile = () => {
        this.isCorrectSize = true;
        let files = Object.values(this.inputFileEl.files);

        if (files.length === 2) {
            this.uploadMultiple(files);
        } else if (files.length < 2) {
            this.uploadOneByOne(files);
        } else {
            console.log('количество загружаемых файлов не больше 2 !');
            this.errorFileEl.innerText = 'Количество загружаемых файлов не больше 2!'
        }
        this.checkTheFields();
}


    submitForm = async(e) => {
        e.preventDefault();

        console.log(this.formEl)
        let formData = new FormData(this.formEl);

        if (this.checkTheFields()) {
            this.buttonSubmitEl.classList.remove('not-active');
            this.errorButton.innerText = '';
            console.log('sending fetch')
            fetch(this.URL, {
                method: 'POST',
                body: formData,
            })
            .then(response => {
                console.log(response)
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
        },1000)
    }
    errorReaction = () => {
        this.errorButton.classList.remove('success');
        this.errorButton.innerText = 'При отправке данных произошла ошибка!';
    }
}

export default FeedbackForm