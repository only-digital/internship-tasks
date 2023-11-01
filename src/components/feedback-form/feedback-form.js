import Component from '../../app/js/base/component';

class FeedbackForm extends Component {
    button;
    emailInput;
    emailInputHeader;
    emailInputError;
    emailInputSvg;
    messageInput;
    messageInputWrapper;
    messageInputHeader;
    messageInputError;
    messageInputSvg;
    fileInput;
    fileInputFilenameWrapper;
    fileInputFilename;
    fileInputFileformat;
    fileInputFilenameSVG;
    secondFileInputFilenameWrapper;
    secondFileInputFilename;
    secondFileInputFileformat;
    fileSizeError;
    maxFilesError;
    deleteFirstFileSVG;
    deleteSecondFileSVG;
    policyCheckbox;



    constructor(element) {
        super(element);

        this.fileList = new FormData();

        this.button = this.getElement('submit-btn');
        
        this.emailInput = this.getElement('email-input');
        this.emailInputHeader = this.getElement('email-input-header');
        this.emailInputError = this.getElement('email-input-error');
        this.emailInputSvg = this.getElement('email-input-svg');

        this.messageInput = this.getElement('message-input');
        this.messageInputHeader = this.getElement('message-input-header');
        this.messageInputError = this.getElement('message-input-error');
        this.messageInputSvg = this.getElement('message-input-svg');
        this.messageInputWrapper = this.getElement('message-input-wrapper');

        this.fileInput = this.getElement('file-input');

        this.fileInputFilenameWrapper = this.getElement('file-input-filename-wrapper');
        this.fileInputFilename = this.getElement('file-input-filename');
        this.fileInputFileformat = this.getElement('file-input-fileformat');
        this.fileInputFilenameSVG = this.getElement('file-input-filename-svg');

        this.secondFileInputFilenameWrapper = this.getElement('second-file-input-filename-wrapper');
        this.secondFileInputFilename = this.getElement('second-file-input-filename');
        this.secondFileInputFileformat = this.getElement('second-file-input-fileformat');

        this.deleteFirstFileSVG = this.getElement('file-input-filename-svg');
        this.deleteSecondFileSVG = this.getElement('second-file-input-filename-svg');

        this.fileSizeError = this.getElement('file-input-size-error');
        this.maxFilesError = this.getElement('max-files-input');

        this.policyCheckbox = this.getElement('policy-checkbox');

        this.button.addEventListener('click', this.onButtonClick)

        this.emailInput.addEventListener('focusout', this.emailValidation)
        this.emailInput.addEventListener('focusin', this.emailChangeStyleAfterValidation)

        this.messageInput.addEventListener('focusout', this.messageValidation)
        this.messageInput.addEventListener('input', this.changeMessageInputHeight)
        this.messageInput.addEventListener('focusin', this.messageChangeStyleAfterValidation)

        this.fileInput.addEventListener('change', this.showFilenameFileformat);

        this.deleteFirstFileSVG.addEventListener('click', this.deleteFirstFile);
        this.deleteSecondFileSVG.addEventListener('click', this.deleteSecondFile);

        this.policyCheckbox.addEventListener('change', this.checkboxSubmitButtonActivation);
    }

    onButtonClick = (event) => {
        this.fileList.append('email', this.emailInput.value);
        this.fileList.append('message', this.messageInput.value);
        this.fileList.append('privacyConfirm', this.policyCheckbox.checked);
        
        fetch('./form', {
            method: 'POST',
            body: this.fileList,
        })
        
        event.preventDefault();
    }

    emailValidation = () => {
        let email = this.emailInput.value.match(/^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/);
        if (!email) {
            this.emailInput.style.border = '1px solid #FF0000';
            this.emailInput.style.borderRadius = '24px';
            this.emailInput.style.padding = '8px 20px 7px 20px';
            this.emailInputHeader.style.visibility = 'visible';
            this.emailInputError.style.display = 'inline';
            this.emailInputSvg.style.display = 'none';
            
        } else {
            this.emailInput.style.border = 'none';
            this.emailInput.style.borderRadius = '24px';
            this.emailInput.style.padding = '8px 20px 7px 20px';
            this.emailInput.style.backgroundColor = '#F4F4F4';
            this.emailInputHeader.style.visibility = 'visible';
            this.emailInputError.style.display = 'none';
            this.emailInputSvg.style.display = 'inline';
        }

        this.submitButtonActivation();
    }

    emailChangeStyleAfterValidation = () => {
        this.emailInput.style.border = 'none';
        this.emailInput.style.borderRadius = '24px';
        this.emailInput.style.padding = '8px 20px 7px 20px';
        this.emailInput.style.backgroundColor = '#F4F4F4';
        this.emailInputError.style.display = 'none';
    }

    messageValidation = () => {
        let message = this.messageInput.value;
        const messageLength = message.length;
        if (messageLength > 1000 || !message) {
            this.messageInput.style.border = '1px solid #FF0000';
            this.messageInput.style.borderRadius = '24px';
            this.messageInput.style.padding = '8px 20px 10px 20px';
            this.messageInputHeader.style.visibility = 'visible';
            this.messageInputError.style.display = 'inline-block';
            this.messageInputError.innerHTML = `Пустое поле либо превышена максимальная длина сообщения: ${messageLength} символов вместо 1000`;
            this.messageInputSvg.style.display = 'none';
            
        } else {
            this.messageInputWrapper.style.marginBottom = '30px';
            this.messageInput.style.border = 'none';
            this.messageInput.style.borderRadius = '24px';
            this.messageInput.style.padding = '8px 45px 10px 20px';
            this.messageInput.style.backgroundColor = '#F4F4F4';
            this.messageInputHeader.style.visibility = 'visible';
            this.messageInputError.style.display = 'none';
            this.messageInputSvg.style.display = 'inline';
        }

        this.submitButtonActivation();
    }

    changeMessageInputHeight = () => {
        this.messageInput.style.height = '48px';
        this.messageInput.style.height = this.messageInput.scrollHeight + 'px';
        this.messageInputSvg.style.top = this.messageInput.scrollHeight - 13 + 'px';
    }

    messageChangeStyleAfterValidation = ()  => {
        this.messageInput.style.border = 'none';
        this.messageInput.style.borderRadius = '24px';
        this.messageInput.style.padding = '8px 45px 10px 20px';
        this.messageInput.style.backgroundColor = '#F4F4F4';
        this.messageInputError.style.display = 'none';
    }

    showFilenameFileformat = () => {
        this.fileSizeError.style.display = 'none';

        if ((this.fileInput.files.length >= 2 && this.fileInputFilenameWrapper.style.display == 'flex') || this.fileInput.files.length > 2) {
            this.fileInput.value = '';
            this.maxFilesError.style.display = 'block';
            setTimeout(() => {
                this.maxFilesError.style.display = 'none';
            }, 5000);
        } else {
            let filesArr = Array.from(this.fileInput.files)
            this.fileSizeError.style.display = 'none';
            for (let [index, file] of filesArr.entries()) {
                if (file.size > 5242880) {
                    delete filesArr[index]
                    this.fileSizeError.style.display = 'block';
                }
            }

            filesArr = filesArr.filter(function (el) {
                return el !== undefined
            })

            if (!filesArr.length) {
                return 0
            }

            if (filesArr.length == 2) {
                this.fileList.append('secondFile', filesArr[1]);

                const filesize = filesArr[1].size;
                const fileName = filesArr[1].name.match(/[\s\S]+(?=\.)/);
                const fileFormat = filesArr[1].name.match(/[^|.]*$/);

                this.secondFileInputFilenameWrapper.style.display = 'flex';

                this.fileNameLengthValidationSecondFile(fileName[0]);

                this.secondFileInputFileformat.innerText = `${fileFormat} ${this.getFileSize(filesize)}`;

                this.fileInput.disabled = true;
            }

            
            if (this.fileList.has('firstFile')) {
                this.fileList.append('secondFile', filesArr[0]);

                const filesize = filesArr[0].size;
                const fileName = filesArr[0].name.match(/[\s\S]+(?=\.)/);
                const fileFormat = filesArr[0].name.match(/[^|.]*$/);

                this.secondFileInputFilenameWrapper.style.display = 'flex';

                this.fileNameLengthValidationSecondFile(fileName[0]);

                this.secondFileInputFileformat.innerText = `${fileFormat} ${this.getFileSize(filesize)}`;

                this.fileInput.disabled = true;
            } else {
                this.fileList.append('firstFile', filesArr[0]);

                const filesize = filesArr[0].size;
                const fileName = filesArr[0].name.match(/[\s\S]+(?=\.)/);
                const fileFormat = filesArr[0].name.match(/[^|.]*$/);

                this.fileInputFilenameWrapper.style.display = 'flex';

                this.fileNameLengthValidationFirstFile(fileName[0]);

                this.fileInputFileformat.innerText = `${fileFormat} ${this.getFileSize(filesize)}`;
                
            }
        }
        for (let i of this.fileList.entries()){
            console.log(i[1], i[0]);
        }
        
        this.submitButtonActivation();
    }

    getFileSize = (filesize) => {
        const sizesTypes = ["Bytes", "KB", "MB"];
        let i = Math.floor(Math.log(filesize) / Math.log(1024));
        let size = parseFloat((filesize / Math.pow(1024, i)).toFixed(0)) + " " + sizesTypes[i];
        return size
    }

    fileNameLengthValidationFirstFile = (name) => {
        if (name.length <= 20) {
            this.fileInputFilename.innerText = name;
        } else {
            this.fileInputFilename.setAttribute('title', `${name}`);
            this.fileInputFilename.innerText = `${name.slice(0, 17)}..`;
        }
    }

    fileNameLengthValidationSecondFile = (name) => {
        if (name.length <= 20) {
            this.secondFileInputFilename.innerText = name;
        } else {
            this.secondFileInputFilename.setAttribute('title', `${name}`);
            this.secondFileInputFilename.innerText = `${name.slice(0, 17)}..`;
        }
    }

    deleteFirstFile = () => {
        this.fileList.delete('firstFile');
        this.fileInputFilenameWrapper.style.display = 'none';
        if (this.fileInput.disabled) {
            this.fileInput.disabled = false;
        }
        if (!this.fileList.has('firstFile') && this.fileList.has('secondFile')) {
            this.button.disabled = true;
        }
        this.submitButtonActivation();
    }

    deleteSecondFile = () => {
        this.fileList.delete('secondFile');
        this.secondFileInputFilenameWrapper.style.display = 'none';
        if (this.fileInput.disabled) {
            this.fileInput.disabled = false;
        }
        if (!this.fileList.has('firstFile') && this.fileList.has('secondFile')) {
            this.button.disabled = true;
        }
        this.submitButtonActivation();
    }

    checkboxSubmitButtonActivation = () => {
        this.submitButtonActivation();
    }

    submitButtonActivation = () => {
        if (this.emailInput.value && this.messageInput.value && (this.fileList.has('firstFile') || this.fileList.has('secondFile')) && this.policyCheckbox.checked) {
            this.button.disabled = false;
        } else {
            this.button.disabled = true;
        }
    }
}

export default FeedbackForm