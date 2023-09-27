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
    errorBlockEl;
    buttonSuccessfulEl;
    loaderEl;
    fieldNameEl;
    inputFileEl;
    regex;
    loadedFile;
    loadedFileName;
    loadedFileMimeType;
    loadedFileType;
    loadedFileSize;
    fileName = [];
    fileSize = [];
    fileType = [];
    fileNameSingle;
    fileSizeSingle;
    fileTypeSingle;
    fileCloseIcon = [];
    isCorrectSize;
    fileListArr;
    loadedFileData;
    uploadInput;
    addFileButton;
    emailFieldEl;
    errorFileEl;
    errorInputEl;
    errorTextEl;
    errorCheckboxEl;
    isValid = false;
    textFieldEl;
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

        this.textFieldEl = this.getElement('textarea-element');

        // this.errorBlockEl.innerText = 'text'
        // console.log(this.errorBlockEl)
        this.buttonSuccessfulEl = this.getElement('button-successful');
        this.loaderEl = this.getElement('loader');
        this.inputFileEl = this.getElement('file-button');
        // console.dir(this.inputFileEl)
        this.emailFieldEl.addEventListener('blur', this.validateEmail)
        this.textFieldEl.addEventListener('blur', this.validateTextField)
        this.inputFileEl.addEventListener('change', this.onLoadFile)

        this.checkboxEl.addEventListener('change', this.validateCheckbox)


        // console.log(this.inputFileEl.files);
        // this.inputFileEl.validationMessage = null;
        // console.log(this.inputFileEl.validationMessage);
        // this.inputEl.addEventListener('focus', (e) => {
        //     {
        //         console.log('focus')
        //         this.fieldNameEl.style.marginLeft = '20px'
        //     }
        // })
        // this.inputEl.addEventListener('blur', (e) => {
        //     {
        //         console.log('blur')
        //         this.fieldNameEl.style.marginLeft = '0px'
        //     }
        // })

        this.formEl.addEventListener('submit', this.submitForm);
    }
    validateCheckbox = () => {

        if (!this.checkboxEl.checked) {
            this.errorCheckboxEl.innerText = 'Нужно согласиться с политикой обработки персональных данных!'
        } else {
            this.errorCheckboxEl.innerText = ''
        }
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
    }
    onLoadFile = (e) => {
        // e.preventDefault()
        this.isCorrectSize = true;
        // let arr = [];
        // console.log(files);
        let files = Object.values(this.inputFileEl.files);

        console.log(files)
        // console.log(arr)

        // if (!this.loadedFile[0].classList.contains('hidden') && !this.loadedFile[0].classList.contains('hidden')) {
        //     console.log('можно загрузить не более 2-х файлов!');
        //     this.uploadInput.addEventListener('click', (e) => {
        //         e.preventDefault();
        //         // this.loadedFile.style.cursor = 'initial'
        //         this.inputFileEl.removeEventListener('change', this.onLoadFile, false)
        //     })
        // } else {
        //     this.uploadInput.removeEventListener('click', (e) => {
        //         e.preventDefault();
        //     })
        // }



        if (files.length === 2) {

            let size = [];
            files.forEach((file) => {
                this.fileName.push(file.name);
                this.fileType.push(file.type);
                size.push(file.size);
                // arr.push(`${file.name} ${file.type} ${file.size}`)
            })
            // console.log(arr)
            // console.log(files)

            size.forEach((el, index) => {
                if (el > 1048576) {
                    let elemSizeMb = Math.round(el / 1048576);
                    if (elemSizeMb > 5) {
                        console.log('размер файла не должен превышать 5 Мб');
                        this.errorFileEl.innerText = 'Размер файла не должен превышать 5 Мб';

                        this.isCorrectSize = false;
                        this.loadedFile.value = '';
                        this.fileName = this.fileName.slice(index + 1);
                        this.fileType = this.fileType.slice(index + 1)
                    } else {
                        this.fileSize.push(`${elemSizeMb} Mb`);
                    }
                } else if (el > 1024) {
                    this.fileSize.push(`${Math.round(el / 1024)} kB`)
                } else {
                    this.fileSize.push(`${Math.round(el)} b`)
                }
            });

            console.log(files)

            // if (files.length > 2) {
            //     console.log('количество загружаемых файлов не больше 2 !');
        if (this.isCorrectSize) {
            console.log('загрузка файла')
            this.fileType.forEach((type) => {
                if (type === 'application/msword' || type === 'application/pdf' || type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {


                        // if (!this.loadedFile[0].classList.contains('hidden') && !this.loadedFile[0].classList.contains('hidden')) {
                        //     console.log('можно загрузить не более 2-х файлов!');
                        //     this.uploadInput.addEventListener('click', (e) => {
                        //         e.preventDefault();
                        //         // this.loadedFile.style.cursor = 'initial'
                        //         // this.inputFileEl.removeEventListener('change', this.onLoadFile, false)
                        //     })
                        // } else {
                        //
                        // }



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
    } else if (files.length < 2) {
            if (!this.loadedFile[0].classList.contains('hidden') && !this.loadedFile[0].classList.contains('hidden')) {
                this.errorFileEl.innerText = 'Количество загружаемых файлов не больше 2!';
            }

            this.fileNameSingle = files[0].name;
            this.fileSizeSingle = files[0].size;
            this.fileTypeSingle = files[0].type;
            console.log(this.fileNameSingle + this.fileSizeSingle + this.fileTypeSingle)

            if (this.fileSizeSingle > 1048576) {
                let elemSizeSingleMb = Math.round(this.fileSizeSingle / 1048576);
                if (elemSizeSingleMb > 5) {
                    console.log('размер файла не должен превышать 5 Мб');
                    this.errorFileEl.innerText = 'Размер файла не должен превышать 5 Мб'
                    this.isCorrectSize = false;
                    this.loadedFile.value = '';
                    this.fileName = '';
                    this.fileType = '';
                } else {
                    this.fileSizeSingle = `${elemSizeSingleMb} Mb`;
                }
            } else if (this.fileSizeSingle > 1024) {
                this.fileSizeSingle = `${Math.round(this.fileSizeSingle / 1024)} kB`;
            } else {
                this.fileSizeSingle =`${Math.round(this.fileSizeSingle)} b`;
            }

            if (this.isCorrectSize) {
                if (this.fileTypeSingle === 'application/msword' || this.fileTypeSingle === 'application/pdf' || this.fileTypeSingle === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                    console.log(this.loadedFile)
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
        } else {
            console.log('количество загружаемых файлов не больше 2 !');
            this.errorFileEl.innerText = 'Количество загружаемых файлов не больше 2 !'
        }
}

    submitForm = (e) => {
        e.preventDefault();
        this.inputValue = this.emailFieldEl.value;
        this.checkboxEl = this.getElement('checkbox-item');

        this.checkboxEl.checked ? this.isChecked = true : this.isChecked = false;

        // this.buttonSubmitEl.classList.add('hidden');

        console.log('button pushed')
        if (!this.isChecked || !this.isValid || this.textFieldEl.value === '' || this.uploadInput.files.value === '') {
            console.log('no')
        } else {
            console.log('yes')
        }
        fetch(this.URL, {
            method: 'POST',
            body: JSON.stringify({
                email: this.inputValue,
                confirm: this.isChecked,
            }),
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(response => console.log(response))
    }
}

export default FeedbackForm