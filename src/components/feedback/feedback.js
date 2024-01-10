import Component from '../../app/js/base/component';


class Feedback extends Component {
    inpt;
    form;
    spanError;
    confirmBoollian;
    regular;
    formDone;
    checkBox;
    checkState=false;
    constructor(element) {
        super(element);
        this.inptFile = this.getElement('inpt-file');
        this.inptFile.addEventListener('input', this.handleFiles, false);
        this.inptBlock = this.getElements('inpt-block');

        this.inptMail = this.getElement('inpt');
        this.inptMail.addEventListener('blur', this.inptMailValid.bind(this));
        this.inptMail.addEventListener('click', this.inptMailFocus.bind(this));

        this.inptMessage = this.getElement('message');
        this.inptMessage.style.cssText = `height: ${this.inptMessage.scrollHeight}px; overflow-y: hidden`;
        this.inptMessage.addEventListener('input', this.inptMessageAutoHeight.bind(this));
        this.inptMessage.addEventListener('click', this.inptMessageFocus.bind(this));
        this.inptMessage.addEventListener('blur', this.inptMessageValid.bind(this));

        this.form = this.getElement('form');
        this.form.addEventListener('submit', this.onSubmit.bind(this));

        this.spanError = document.querySelectorAll('.feedback__span-error');
        this.regular = /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/;
        this.formDone = this.getElement('form-done');
        this.labelUpload = this.getElement('label-upload');
        this.filesContainer = this.getElement('files-container');
        this.popup = document.querySelector('.popup-file');
        this.uploadBtn = document.querySelector('.upload-btn');

        this.checkBox = document.querySelector('.check-button__inpt');
        this.checkBox.addEventListener('change', this.handleCheckboxChange.bind(this));
       
    }

    handleCheckboxChange(e) {
        this.checkState = e.target.checked;
    }


    inptMailFocus = () => {
        this.inptMail.classList.add('feedback__input-focus');
        this.inptBlock[0].firstChild.classList.remove('visibility-true');
    }

    inptMailValid = () => {

        if (!this.regular.test(this.inptMail.value)) {

            this.inptBlock[0].firstChild.classList.remove('visibility-true');//прячем 
            this.spanError[0].textContent = "Некорректный формат email";
            this.spanError[0].classList.add('visibility-true');
            this.inptMail.classList.remove('feedback__input-focus');
            this.inptMail.classList.remove('feedback__valid');
            this.inptMail.classList.add('feedback__invalid');
        } else {

            this.inptBlock[0].firstChild.classList.add('visibility-true');//рисуем 
            this.spanError[0].classList.remove('visibility-true');
            this.inptMail.classList.remove('feedback__input-focus');
            this.inptMail.classList.add('feedback__valid');
            this.inptMail.classList.remove('feedback__invalid');
        }

    }

    inptMessageFocus = () => {
        this.spanError[0].classList.remove('visibility-true');
        this.inptMessage.classList.add('feedback__input-focus');
    }

    inptMessageAutoHeight = () => {

        this.inptMessage.style.height = 'auto';
        this.inptMessage.style.height = `${this.inptMessage.scrollHeight}px`;
    }

    inptMessageValid = () => {
        if (this.inptMessage.value.length > 20) {
            this.inptBlock[1].firstChild.classList.add('visibility-true');
            this.inptMessage.classList.remove('feedback__input-focus');
            this.inptMessage.classList.remove('feedback__invalid');
            this.inptMessage.classList.add('feedback__valid');
            this.spanError[1].classList.remove('visibility-true');
        } else {
            this.inptBlock[1].firstChild.classList.remove('visibility-true');
            this.inptMessage.classList.remove('feedback__input-focus');
            this.inptMessage.classList.remove('feedback__valid');
            this.inptMessage.classList.add('feedback__invalid');
            this.spanError[1].textContent = 'минимальное количество символов 20';
            this.spanError[1].classList.add('visibility-true');
        }

    }


    handleFiles = () => {
        if (this.filesContainer.childNodes.length >= 4) { //проверяем на кол-во файлов
            this.popup.classList.add('display-block') ;
            this.uploadBtn.classList.toggle('upload-btn__disabled');
            this.labelUpload.classList.add('pointer-ev-none');
            setTimeout(() => { this.popup.classList.remove('display-block'); }, 4000)
        } else {
            this.spanError[2].classList.remove('visibility-true');

            if (this.inptFile.files[0]) { //если файл выбран то =>
                const file = this.inptFile.files[0];
                let fileDataBox = document.createElement('div');
                fileDataBox.classList.add('feedback__file-box');
                fileDataBox.textContent = 'Документ';

                let fileData = document.createElement('span');
                let fileDeleteBtn = document.createElement('span');
                fileDeleteBtn.classList.add('feedback__file-del-btn');

                let fileFormat = file.name.split('.')[1].toUpperCase();
                let fileSize = Math.floor(file.size / 1024);
                if (fileSize > 1024) {
                    fileSize = fileSize / 1024;
                    if (fileSize > 5) {
                        this.spanError[2].textContent = 'Максимальный размер файла 5 MB';
                        this.spanError[2].classList.add('visibility-true');
                        return;
                    } else {
                        fileSize = fileSize.toString().slice(0, 4) + 'MB';
                    }
                } else {
                    fileSize = fileSize + 'kB';
                };
                fileData.textContent = fileFormat + ',' + ' ' + fileSize;

                fileDataBox.append(fileData, fileDeleteBtn);
                this.filesContainer.append(fileDataBox);

                fileDataBox.childNodes[2].addEventListener('click', (e) => {
                    fileDataBox.remove();
                    this.popup.classList.remove('display-block');
                    this.uploadBtn.classList.remove('upload-btn__disabled');
                    this.labelUpload.classList.remove('pointer-ev-none');
                }, true)
            }
        }
    }

   
    onSubmit = async (e) => {
        e.preventDefault();
    
        this.confirmBoollian = false;
    
        if (this.checkState) {
            this.confirmBoollian = true;
        }
    
        if (this.inptMessage.value === null) {
            this.inptMessage.style.border = '1px solid red';
            this.spanError[1].textContent = 'минимальное количество символов 20';
            this.spanError[1].classList.add('visibility-true');
        }
    
        const formData = new FormData();
    
        formData.append('email', this.inptMail.value);
        formData.append('confirm', this.confirmBoollian);
        formData.append('message', this.inptMessage.value );
        
        for (const fileInput of this.inptFile.files) {
            formData.append('files', fileInput);
        }
        
     
       
        if (this.inptMail.value !== '') {
            try {
                const response = await fetch('/form', {
                  method: 'POST',
                  
                   body: formData,
                   headers:{
                    "Content-Type":'multipart/form-data'
                }
            });
      
                 console.log('server', response)
                if (!response.ok) {
                    
                    throw new Error('Server error');
                }
    
                if (this.regular.test(this.inptMail.value) && !this.checkState) {
                    this.spanError[2].textContent = 'Подтвердите обработку данных';
                    this.spanError[2].classList.add('visibility-true');
                } else {
                    this.spanError[2].classList.remove('visibility-true');
                }
    
                this.form.style.opacity = '0.3';
                this.form.classList.add('pointer-ev-none');
                this.spanError.forEach(el => {
                    el.textContent = '';
                });
                this.form.lastChild.classList.add('display-none') ;
                this.formDone.classList.add('display-flex');
            } catch (error) {
                console.error('Error:', error);
               
            }
        } else {
            this.spanError[0].classList.add('visibility-true');
        }
    }

}
export default Feedback