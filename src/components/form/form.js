import Component from '../../app/js/base/Component';

class Form extends Component {

    serverError;
    policyError;
    policyInput;
    loader;
    submitButton;
    errors;
    inputEmailRoot;
    inputEmail;
    errorEmail;
    tipEmail;
    textarea;
    errorTextarea;
    tipTextarea;
    inputFile;
    inputFileWrapper;
    fileError;

    constructor(element) {
        super(element);

        this.root.addEventListener('submit',this.handleFormSubmit);
        this.serverError = this.getElement('server-error');
        this.loader = this.root.querySelector('.loader');
        this.submitButton = this.root.querySelector('.button');
        this.inputEmailRoot = this.root.querySelector('.input-email');
        this.inputEmail = this.inputEmailRoot.querySelector('.input-email__input');
        this.errorEmail = this.inputEmailRoot.querySelector('.input-email__error');
        this.tipEmail = this.inputEmailRoot.querySelector('.input-email__svg');
        this.policyInput = this.root.querySelector('.checkbox__input');
        this.policyError = this.root.querySelector('.checkbox__error');
        this.policyInput.addEventListener('change',this.handlePolicyInput);
        this.inputEmail.addEventListener('input',this.handleEmailInput);
        this.inputEmail.addEventListener('focus',this.handleEmailFocus);
        this.textarea = this.root.querySelector('.textarea__area');
        this.errorTextarea = this.root.querySelector('.textarea__error');
        this.tipTextarea = this.root.querySelector('.textarea__svg');
        this.inputFile = this.root.querySelector('.input-file__input');
        this.fileError = this.root.querySelector('.form__file-error');
        this.inputFile.addEventListener('input',this.handleInputFile);
        this.inputFileWrapper = this.root.querySelector('.form__input-file-wrapper');
        this.textarea.addEventListener('input',this.handleTextareaInput);
        this.textarea.addEventListener('blur',this.handleTextareaCorrectInput);
        this.errors = new Map([
                                ['email',  false],
                                ['textarea', false],
                                ['policy', false],
                                ['file', true]
                            ]);
        this.disableSubmitButton();
    }

    showInputFilesError = (errorDescription) => {
        this.fileError.classList.remove('form_invisible-elem');
        this.fileError.textContent = errorDescription;
    }

    hideInputFilesError = () => {
        this.fileError.textContent = '';
        this.fileError.classList.add('form_invisible-elem');
    }

    removeFileInfoNodes = () => {
        const filesInfo = this.root.querySelectorAll('.file-info');
        for (const fileInfo of filesInfo) {
            const parentNode = fileInfo.parentNode;
            parentNode.removeChild(fileInfo);
        }
    }

    handleInputFile = (event) => {
        this.hideInputFilesError();
        this.removeFileInfoNodes();
        const files = event.target.files;
        let correctSize = true;
        let correctNumber = false;
        if (files.length>2) {
            this.showInputFilesError('Максимум 2 файла');
        } else correctNumber = true;

        for (const file of files){
            console.log('filesize=' + file.size)
            if (file.size>5000000) {
                this.showInputFilesError('Максимальный размер файла не более 5мб');
                correctSize = false;
                break;
            }
        }
        
        const fileInputIsCorrect = correctSize && correctNumber;

        if (fileInputIsCorrect) {
            this.errors.set('file',true);
            for (const file of files) {
                const fileSize = file['size'];
                const fileExtension = file['name'].split('.')[1];
                this.appendFileInfo(fileExtension,fileSize);
            }
        } else this.errors.set('file',false);
        this.checkErrors();
    }

    appendFileInfo = (fileExtension,fileSize) => {
        const fileInfoFragment = document.createDocumentFragment();
        const fileInfoRoot = document.createElement('div');
        fileInfoRoot.dataset.file=Date.now()+fileSize+fileExtension;
        fileInfoRoot.classList.add('file-info');
        const spanDoc = document.createElement('span');
        spanDoc.classList.add('file-info__span');
        spanDoc.innerText = 'Документ ';
        const spanExtension = document.createElement('span');
        spanExtension.classList.add('file-info__span');
        spanExtension.innerText = fileExtension+', ';
        spanExtension.classList.add('file-info__text_gray');
        const spanSize = document.createElement('span');
        spanSize.classList.add('file-info__span');
        spanSize.classList.add('file-info__text_gray');
        spanSize.innerText = this.bytesToKb(fileSize)+'kB';
        fileInfoRoot.appendChild(spanDoc);
        fileInfoRoot.appendChild(spanExtension);
        fileInfoRoot.appendChild(spanSize);
        fileInfoFragment.appendChild(fileInfoRoot);
        const svgRoot = document.createElement('div');
        svgRoot.classList.add('file-info__svg');
        svgRoot.addEventListener('pointerdown',this.handleFileInfoClick);
        this.renderIcon(svgRoot);
        fileInfoRoot.appendChild(svgRoot);
        this.inputFileWrapper.appendChild(fileInfoFragment);
    }

    handleFileInfoClick = (event) => {
        const fileClickedId = event.target.parentNode.parentNode.dataset.file;
        const filesInfo = this.root.querySelectorAll('.file-info');
        for (const fileInfo of filesInfo) {
            if (fileInfo.dataset.file === fileClickedId) {
                const parentNode = fileInfo.parentNode;
                const svgRoot = fileInfo.querySelector('.file-info__svg');
                svgRoot.removeEventListener('pointerdown',this.handleFileInfoClick);
                parentNode.removeChild(fileInfo);
            }
        }
    }

    renderIcon = (node) => {
        const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const iconPath = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'path'
        );
        iconSvg.setAttribute('viewBox', '0 0 20 20');
        iconPath.setAttribute(
            'd',
            'M5.77495 15L10.0741 10.7008L14.2251 14.8518L14.8518 14.2251L10.7008 10.0741L15 5.77495L14.3733 5.14825L10.0741 9.44742L5.6267 5L5 5.6267L9.44742 10.0741L5.14825 14.3733L5.77495 15Z'
        );
        iconSvg.appendChild(iconPath);
        return node.appendChild(iconSvg);
    }

    handleTextareaCorrectInput = (event) => {
        if (event.target.value.length >= 1 && event.target.value.length <=1000) {
            this.showCorrectTextAreaInput();
        } else {
            this.hideCorrectTextareaInput();
        }
    }

    showCorrectTextAreaInput = () => {
        this.textarea.classList.add('textarea__area_correct_input');
        this.tipTextarea.classList.remove('textarea_invisible_elem');
        this.errors.set('textarea',true);
        this.checkErrors();
    }

    hideCorrectTextareaInput = () => {
        this.textarea.classList.remove('textarea__area_correct_input');
        this.tipTextarea.classList.add('textarea_invisible_elem');
        this.errors.set('textarea',false);
        this.checkErrors();
    }

    showTextareaError = () => {
        this.errorTextarea.classList.remove('textarea_invisible_elem');
        this.textarea.classList.add('textarea_error');
        this.errors.set('textarea',false);
        this.checkErrors();
    }

    hideTextareaError = () => {
        this.errorTextarea.classList.add('textarea_invisible_elem');
        this.textarea.classList.remove('textarea_error');
        this.errors.set('textarea',true);
        this.checkErrors();
    }

    handleTextareaInput = (event) => {
        if (event.target.value.length > 1000) {
            this.showTextareaError();
        } else this.hideTextareaError();
        this.textarea.setAttribute('style', 'height:' + (event.target.scrollHeight) + 'px;overflow-y:hidden;');
        this.textarea.style.height = 'auto';
        this.textarea.style.height = event.target.scrollHeight+'px';
    }

    handleEmailInput = (event) => {
        const emailRegExp = /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/;
        if (!emailRegExp.test(event.target.value)) {
            this.showEmailError('Введите email');
            this.hideEmailTip();
            this.errors.set('email',false);
        } else if (event.target.value.length > 255) {
            this.showEmailError('Введите значение менее 255 символов');
            this.hideEmailTip();
            this.errors.set('email',false);
        } else {
            this.hideEmailError();
            this.showEmailTip();
            this.errors.set('email',true);
        }
        this.checkErrors();
    }

    handlePolicyInput = (event) => {
        if(event.target.checked) {
            this.policyError.classList.add('checkbox_invisible-elem');
            this.errors.set('policy',true);
        } else {
            this.errors.set('policy',false);
            this.policyError.classList.remove('checkbox_invisible-elem');
        }
        this.checkErrors();
    }

    checkErrors = () => {
        let formIsValid = true;
        for (let value of this.errors.values()) {
            if (!value) {
                formIsValid = false;
                break;
            }
        }
        if (formIsValid) {
            this.enableSubmitButton();
        } else this.disableSubmitButton();
    }

    enableSubmitButton = () => {
        this.submitButton.classList.remove('button_disabled');
        this.submitButton.removeAttribute('disabled');
    }

    showEmailTip = () => {
        this.tipEmail.classList.remove('input-email_invisible');
    }

    hideEmailTip = () => {
        if (!this.tipEmail.classList.contains('input-email_invisible')) {
            this.tipEmail.classList.add('input-email_invisible');
        }
    }

    showEmailError = (error) =>{
        this.errorEmail.classList.remove('input-email_invisible');
        this.inputEmail.classList.add('input-email__input_error');
        const prevError = this.errorEmail.innerText;
        if (!prevError.includes(error)) {
            this.errorEmail.innerText = prevError + ' ' + error;
        }
    }

    hideEmailError = () => {
        this.errorEmail.innerText = '';
        this.errorEmail.classList.add('input-email_invisible');
        this.inputEmail.classList.remove('input-email__input_error');
    }

    handleEmailFocus = () => {
        this.hideEmailError();
    }

    hideEmailError = () => {
        this.errorEmail.innerText = '';
        this.errorEmail.classList.add('input-email_invisible');
        this.inputEmail.classList.remove('input-email__input_error');
    }

    showLoader = () => {
        this.loader.classList.remove('loader_disabled')
    }

    hideLoader = () => {
        this.loader.classList.add('loader_disabled')
    }

    disableSubmitButton = () => {
        if (!this.submitButton.classList.contains('button_disabled')) {
            this.submitButton.classList.add('button_disabled');
            this.submitButton.setAttribute('disabled', '');
        }
    }

    bytesToKb = (bytes) => {
        return (bytes / 1024).toFixed(1);
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(this.root);
        console.log(formData);
        if (!formData.get('policy')) {
            this.setPolicyError();
        } else {
            this.submitData({
                email: formData.get('email'),
                policy: true,
            })
        }
    }

    setError = (errorText) => {
        this.serverError.classList.remove('form_invisible-elem');
        this.serverError.textContent = errorText;
    }

    clearError = () => {
        this.serverError.textContent = '';
        this.serverError.classList.add('form_invisible-elem');
    }

    setPolicyError = () => {
        this.policyError.classList.remove('form_invisible-elem');
    }

    clearPolicyError = () => {
        this.policyError.classList.add('form_invisible-elem');
    }

    submitData = async (data) => {
        this.clearError();
        const url = 'http://localhost:3000/form';
        try {
            this.showLoader();
            const response = await fetch(url,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body:JSON.stringify(data)
            });
            this.hideLoader();
            if (!response.ok) {
                this.setError(response.statusText);
            } else this.root.reset();
        } catch (error) {
            console.error(error);
        }
    }

}

export default Form