import Component from '../../app/js/base/component';


class Feedback extends Component {
    inpt;
    form;
    spanError;
    confirmBoollian;
    regular;
    formDone;
    constructor(element) {
        super(element);
        this.inptFile = this.getElement('inpt-file');
        this.inptFile.addEventListener('input', this.handleFiles, false);
        this.inptBlock = this.getElements('inpt-block');

        this.inptMail = document.getElementById('email');
        this.inptMail.addEventListener('blur', this.inptMailValid);
        this.inptMail.addEventListener('click', this.inptMailFocus);

        this.inptMessage = document.getElementById('message');
        this.inptMessage.style.cssText = `height: ${this.inptMessage.scrollHeight}px; overflow-y: hidden`;
        this.inptMessage.addEventListener('input', this.inptMessageAutoHeight);
        this.inptMessage.addEventListener('click', this.inptMessageFocus);
        this.inptMessage.addEventListener('blur', this.inptMessageValid);

        this.form = this.getElement('form');
        this.form.addEventListener('submit', this.onSubmit);

        this.spanError = document.querySelectorAll('.feedback__span-error');
        this.regular = /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/;
        this.formDone = this.getElement('form-done');
        this.labelUpload = this.getElement('label-upload');
        this.filesContainer = this.getElement('files-container');
        this.popup = document.querySelector('.popup-file');
        this.uploadBtn = document.querySelector('.upload-btn');
    }
   
    inptMailFocus = () => {
        this.inptMail.classList.add('feedback__input-focus');
        this.inptBlock[0].firstChild.style.opacity = '0';
    }
 
     inptMailValid = () => {

        if (!this.regular.test(this.inptMail.value)) {
            this.inptBlock[0].firstChild.style.opacity = '0';//прячем svg
            this.spanError[0].textContent = "Некорректный формат email";
            this.spanError[0].style.opacity = '1';
            this.inptMail.classList.remove('feedback__input-focus');
            this.inptMail.classList.remove('feedback__valid');
            this.inptMail.classList.add('feedback__invalid');
        } else {
            this.inptBlock[0].firstChild.style.opacity = '1';//рисуем svg
            this.spanError[0].style.opacity = '0';
            this.inptMail.classList.remove('feedback__input-focus');
            this.inptMail.classList.add('feedback__valid');
            this.inptMail.classList.remove('feedback__invalid');
        }
      
    }

    inptMessageFocus = () => {
        this.spanError[0].style.opacity = '0';
        this.inptMessage.classList.add('feedback__input-focus');
    }

    inptMessageAutoHeight = () => {
        
        this.inptMessage.style.height = 'auto';
        this.inptMessage.style.height = `${this.inptMessage.scrollHeight}px`;
    }

    inptMessageValid = () => {
        if (this.inptMessage.value.length > 20 ) {
            this.inptBlock[1].firstChild.style.opacity = '1';
            this.inptMessage.classList.remove('feedback__input-focus');
            this.inptMessage.classList.remove('feedback__invalid');
            this.inptMessage.classList.add('feedback__valid');
            this.spanError[1].style.opacity = '0';
        }else{
            this.inptBlock[1].firstChild.style.opacity = '0';
            this.inptMessage.classList.remove('feedback__input-focus');
            this.inptMessage.classList.remove('feedback__valid');
            this.inptMessage.classList.add('feedback__invalid');
            this.spanError[1].textContent = 'минимальное количество символов 20';
            this.spanError[1].style.opacity = '1';
        }
        
    }


    handleFiles = () => {
        if (this.filesContainer.childNodes.length >= 4 ) { //проверяем на кол-во файлов
            this.popup.style.display = 'block';
            this.uploadBtn.classList.toggle('upload-btn__disabled');
            this.labelUpload.style.pointerEvents = 'none';
            setTimeout(() => { this.popup.style.display = 'none'; }, 4000)
        } else {
            this.spanError[2].style.opacity = '0';

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
                        this.spanError[2].style.opacity = '1';
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
                console.log(this.filesContainer.childNodes)
                console.log()
                fileDataBox.childNodes[2].addEventListener('click', (e) => {
                    fileDataBox.remove();
                    this.popup.style.display = 'none';
                    this.uploadBtn.classList.remove('upload-btn__disabled');
                    this.labelUpload.style.pointerEvents = 'auto';
                }, true)
            }
        }
    }


    onSubmit = (e) => {
        e.preventDefault();

        this.confirmBoollian = false;

        if (JSON.parse(localStorage.getItem('checkCount')) % 2 === 0) {//проверка на чекед
            this.confirmBoollian = true;
        }
        console.log(this.inptMessage.value)
        if( this.inptMessage.value === null){//проверка textarea 
            this.inptMessage.style.border = '1px solid red';
            this.spanError[1].textContent = 'минимальное каличество символов 20';
            this.spanError[1].style.opacity = '1';
        }
        if (this.inptMail.value !== '') {
            fetch('/form', {
                method: 'POST',
                body: JSON.stringify({
                    email: `${this.inptMail.value}`,
                    confirm: this.confirmBoollian
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {



                if (this.regular.test(this.inptMail.value) === true && JSON.parse(localStorage.getItem('checkCount')) % 2 !== 0) {
                    console.log(JSON.parse(localStorage.getItem('checkCount')))
                    this.spanError[2].textContent = "Подтвердите обработку данных",
                        this.spanError[2].style.opacity = '1';
                }

                if (res.ok) {
                   
                    this.form.style.opacity = '0.3';
                    this.form.style.pointerEvents = 'none';
                    this.spanError.forEach(el=>{
                        el.textContent = '';
                    })
                    this.form.lastChild.style.display = 'none';
                    this.formDone.style.display = 'flex'
                }
            }
            )
        } else { this.spanError[0].style.opacity = '1'; }
    }

}
export default Feedback