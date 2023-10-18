import Component from '../../app/js/base/Component';

class Form extends Component {
    constructor(element) {
        super(element);


        this.fileList = [];
        
        this.textValidation = {
            'email': false,
            'msg': false,
            "checkbox": false,
            'files': true
        };

        this.sendingData = {
            'email': '',
            'msg': '',
            'files': ' '
        }

        this.oldScrollHeight = 120;
        this.countFiles = 0;

        this.email = this.getElement('email');
        this.emailName = this.getElement('email-name');
        this.errorText = this.getElements('errorText');
        this.emailGood = this.getElement('svg-goodEmail');

        this.msg = this.getElement('msg');
        this.msgName = this.getElement('msg-name');
        this.msgGood = this.getElement('svg-goodMsg');

        this.checkBox = this.getElement('checkbox-input');
        this.yesCheckBox = this.getElement("checkbox-yes");

        this.addFile = this.getElement('file'); //настоящий input-file
        this.wrapperAddFile = this.getElement('add-file'); //кнопка на экране для добавления файла
        this.fileError = this.getElement('file-error'); //сообщение об ошибке
        this.newFile = this.getElements('newFile'); //кнопка с добавленным файлом
        this.closeFile = this.getElements('delFile');
        this.countFilesError = this.getElement('twoFiles');

        this.sendInfo = this.getElement('send');
        this.sendResult = this.getElement('result');

        console.log(this.sendResult)

        this.addFile.addEventListener("input", this.checkFileSize);

        this.email.addEventListener("input", this.emailFocus);
        this.email.addEventListener("focusout", this.emailValidation);
        this.email.addEventListener("focusin", this.emailValidDel);

        this.msg.addEventListener("input", this.msgFocus);
        this.msg.addEventListener("input", this.msgCalculateHeight);
        this.msg.addEventListener("focusout", this.msgValidation);
        this.msg.addEventListener("focusin", this.msgValidDel);

        this.checkBox.addEventListener("change", this.checkBoxChange);
        this.closeFile[0].addEventListener('click', this.deleteFile);
        this.closeFile[1].addEventListener('click', this.deleteFile);

        this.sendInfo.addEventListener("click", this.sendData);
    }

   sendData = () => {

    const self = this;

    this.sendingData.files = this.fileList;
    
    console.log(this.sendingData);
    
    fetch('http://localhost:3000/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(this.sendingData)
    })

    .then(function (response) {
            if (response.ok) { 
                self.sendResult.classList.remove('hidden');
                self.sendResult.textContent = 'Данные успешно отправлены';
                self.sendResult.classList.remove('form__result-bad');
            }
            else {
                self.sendResult.classList.remove('hidden');
                self.sendResult.classList.add('form__result-bad');
                self.sendResult.textContent = 'Произошла ошибка при отправке данных, попробуйте еще раз';
            }
    })

    .catch(function (error) {
        console.error(error);
    });
   } 

   checkCountFiles = () => {
        if (this.countFiles < 2)
            return;

        this.countFilesError.classList.remove('hidden');
        this.addFile.setAttribute('disabled','');
        this.wrapperAddFile.setAttribute('disabled','');
        
        this.textValidation.files = false;
        this.checkTextFields();
   }

   deleteFile = () => {

        this.delFileSizeError();

        let index = 0;
        if (event.target.parentNode === this.closeFile[1])
            index = 1;

        console.log("Удаляем - ", index)

        this.newFile[index].classList.toggle('hidden');
        this.countFiles--;
        this.fileList.splice(index,index);
        console.log("После удаления", this.fileList)

        if (this.countFiles) //значит было 2
        {
            this.countFilesError.classList.toggle('hidden');
            this.addFile.removeAttribute('disabled');
            this.wrapperAddFile.removeAttribute('disabled');
        }

        this.textValidation.files = true;
        this.checkTextFields();
   }

   showFile = (fileSize, fileType, file) => {

        let currentFile;

        if (this.countFiles === 0)
            currentFile = this.newFile[0];
        else {
            currentFile = this.newFile[1];
        }

        const fileElSize = currentFile.querySelector('.form__fileSize');
        const fileElType = currentFile.querySelector('.form__fileType');

        fileElSize.textContent = ' ' + fileSize + ' kB';

        if (fileType.includes('/pdf'))
            fileElType.textContent = '.PDF';
        else if (fileType.includes('/msword'))
            fileElType.textContent = '.doc';
        else
            fileElType.textContent = '.docx';

        currentFile.classList.toggle('hidden');
        this.fileList.push(file);
        this.countFiles++;

        this.checkCountFiles();
        console.log(this.fileList)
    }

   delFileSizeError = () => {

        this.fileError.classList.add('hidden');
        this.wrapperAddFile.classList.remove('error');
        this.wrapperAddFile.classList.remove('error');
        this.newFile[0].classList.remove('error');
        this.newFile[1].classList.remove('error');

   } 

   checkFileSize = () => {
       this.delFileSizeError();

       const fileSize = this.addFile.files[0].size;
       const fileType = this.addFile.files[0].type;

        if (this.addFile.value)
        {
            if (fileSize > 5_242_880) //5МБ в байтах
            {

               // this.addFile.files = '';
                this.fileError.classList.toggle('hidden');
                this.wrapperAddFile.classList.toggle('error');
                
                this.newFile[0].classList.toggle('error');
                this.newFile[1].classList.toggle('error');

                this.textValidation.files = false;
                this.checkTextFields();
                return; //добавить удаление этого файла
            }

            else
            {
                const sizeToShow =  Math.round((fileSize / 1024) * 10) / 10;
                this.showFile(sizeToShow, fileType, this.addFile.files[0]);

                this.textValidation.files = true;
                this.checkTextFields();
            }

            console.log(this.addFile.files)
        }
    }

   checkTextFields = () => {
        if (this.textValidation.email === false || this.textValidation.msg === false || this.textValidation.checkbox === false || this.textValidation.files === false)
            this.sendInfo.setAttribute('disabled', '');
        else
            this.sendInfo.removeAttribute('disabled');
   }

   checkBoxChange = () => {
        
        this.yesCheckBox.classList.toggle("hidden");
        this.checkBox.classList.toggle("agree");

        if (this.checkBox.classList.contains('agree'))
            this.textValidation.checkbox = true; 
        else
            this.textValidation.checkbox = false; 
        
        this.checkTextFields();
   }

   emailValidation = () => {
        const regexpEmail = /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/;

        if(!regexpEmail.test(this.email.value) || (this.email.value.length > 255)) {
            this.email.classList.add('form__error');
            this.errorText[0].classList.remove('hidden');

            this.textValidation.email = false;
            this.sendInfo.setAttribute('disabled', '');
        }

        else {
            this.email.classList.add('form__email-good');
            this.emailGood.classList.remove('hidden');
            this.errorText[0].classList.add('hidden');


            this.textValidation.email = true;
            this.sendingData.email = this.email.value;
        }

        this.checkTextFields();

   }

   emailValidDel = () => {

       this.email.classList.remove('form__email-error');
       this.email.classList.remove('form__email-good');

       this.errorText[0].classList.add('hidden');
       this.emailGood.classList.add('hidden');
   }

   emailFocus = () => {
        if (this.email.value!='') {
            this.email.classList.add('activeEmail');
            this.emailName.classList.remove('hidden');
        }
        else {
            this.email.classList.remove('activeEmail');
            this.emailName.classList.add('hidden')
        }
    }

   msgValidDel = () => {
       this.msg.classList.remove('form__error');
       this.errorText[1].classList.add('hidden');
       this.msgGood.classList.add('hidden');
   }

   msgValidation = () => {
        
        if (this.msg.value.length > 1000) {
            
            this.msg.classList.add('form__error');
            
            this.errorText[1].classList.remove('hidden');
            this.msgGood.classList.add('hidden');

            this.textValidation.msg = false;
        }

        else if (this.msg.value.length === 0) 
            this.textValidation.msg = false;

        else {
            const styles = window.getComputedStyle(this.msg);
            const currentMsgHeight = styles.height.substr(0,styles.height.indexOf('p'));
            this.msgGood.style.top = (Number(currentMsgHeight) - 25) + 'px';

            this.msgGood.classList.remove('hidden');

            this.textValidation.msg = true;
            this.sendingData.msg = this.msg.value;
        }

        this.checkTextFields();

   }

   msgCalculateHeight = () => {
        
    
        if ((this.msg.scrollHeight - this.oldScrollHeight) > 10) {
                
            this.msg.style.height = "1px";
            this.msg.style.height = (10 + this.msg.scrollHeight) + "px";
                
            this.oldScrollHeight = this.msg.scrollHeight;
        }

    }

   msgFocus = () => {

        if (this.msg.value!='') {
            this.msg.classList.add('activeMsg');
            this.msgName.classList.remove('hidden');
        }

        else {
            this.msg.classList.remove('activeMsg');
            this.msgName.classList.add('hidden')
        }
    }
}

export default Form