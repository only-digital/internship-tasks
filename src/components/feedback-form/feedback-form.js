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
    policyCheckbox;



    constructor(element) {
        super(element);

        this.button = this.getElement('submit-btn')
        
        this.emailInput = this.getElement('email-input')
        this.emailInputHeader = this.getElement('email-input-header')
        this.emailInputError = this.getElement('email-input-error')
        this.emailInputSvg = this.getElement('email-input-svg')

        this.messageInput = this.getElement('message-input')
        this.messageInputHeader = this.getElement('message-input-header')
        this.messageInputError = this.getElement('message-input-error')
        this.messageInputSvg = this.getElement('message-input-svg')
        this.messageInputWrapper = this.getElement('message-input-wrapper')

        this.fileInput = this.getElement('file-input');
        this.fileInputFilenameWrapper = this.getElement('file-input-filename-wrapper');
        this.fileInputFilename = this.getElement('file-input-filename');
        this.fileInputFileformat = this.getElement('file-input-fileformat');
        this.fileInputFilenameSVG = this.getElement('file-input-filename-svg');

        this.policyCheckbox = this.getElement('policy-checkbox');

        this.button.addEventListener('click', this.onButtonClick)

        this.emailInput.addEventListener('focusout', this.emailValidation)
        this.emailInput.addEventListener('focusin', this.emailChangeStyleAfterValidation)

        this.messageInput.addEventListener('focusout', this.messageValidation)
        this.messageInput.addEventListener('input', this.changeMessageInputHeight)
        this.messageInput.addEventListener('focusin', this.messageChangeStyleAfterValidation)

        this.fileInput.addEventListener('change', this.showFilenameFileformat);

        this.policyCheckbox.addEventListener('change', this.checkboxSubmitButtonActivation);
    }

    onButtonClick = (event) => {

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
        const fileList = this.fileInput.files;
        const filesize = fileList[0].size
        const sizesTypes = ["Bytes", "KB", "MB"];
        const fileName = fileList[0].name.match(/[\s\S]+(?=\.)/);
        const fileFormat = fileList[0].name.match(/[^|.]*$/);

        let i = Math.floor(Math.log(filesize) / Math.log(1024));
        let size = parseFloat((filesize / Math.pow(1024, i)).toFixed(0)) + " " + sizesTypes[i];

        this.fileInputFilenameWrapper.style.display = 'flex';

        if (fileName[0].length <= 20) {
            this.fileInputFilename.innerText = fileName;
        } else {
            this.fileInputFilename.setAttribute('title', `${fileName}`);
            this.fileInputFilename.innerText = `${fileName[0].slice(0, 17)}..`;
        }

        this.fileInputFileformat.innerText = `${fileFormat} ${size}`;

        this.submitButtonActivation();
    }

    checkboxSubmitButtonActivation = () => {
        this.submitButtonActivation();
    }

    submitButtonActivation = () => {
        if (this.emailInput.value && this.messageInput.value && this.fileInput.value && this.policyCheckbox.checked) {
            this.button.disabled = false;
        } else {
            this.button.disabled = true;
        }
    }
}

export default FeedbackForm