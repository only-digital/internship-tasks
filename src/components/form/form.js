import Component from '../../app/js/base/Component';

class Form extends Component {
    constructor(element) {
        super(element);


        this.fileList = [];
        this.textValidation = {
            'email': false,
            'msg': true
        };

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
    }

   checkCountFiles = () => {
        if (this.countFiles < 2)
            return;

        this.countFilesError.classList.remove('hidden');
        this.addFile.setAttribute('disabled','');
        this.wrapperAddFile.setAttribute('disabled','');
   }

   deleteFile = () => {

        console.log(this.closeFile)
        console.log(event.target.parentNode);

        let index = 0;
        if (event.target.parentNode === this.closeFile[1])
            index = 1;

        console.log("Удаляем - ", index)

        this.newFile[index].classList.toggle('hidden');
        this.countFiles--;
        this.fileList.splice(index,index);

        if (this.countFiles) //значит было 2
        {
            this.countFilesError.classList.toggle('hidden');
            this.addFile.removeAttribute('disabled');
            this.wrapperAddFile.removeAttribute('disabled');
        }
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

   checkFileSize = () => {

        console.log('d')
       this.fileError.classList.add('hidden');
       this.wrapperAddFile.classList.remove('error');

       const fileSize = this.addFile.files[0].size;
       const fileType = this.addFile.files[0].type;

        if (this.addFile.value)
        {
            if (fileSize > 5_242_880) //5МБ в байтах
            {

                this.addFile.files = '';
                this.fileError.classList.toggle('hidden');
                this.wrapperAddFile.classList.toggle('error');

                return; //добавить удаление этого файла
            }

            else
            {
                const sizeToShow =  Math.round((fileSize / 1024) * 10) / 10;
                this.showFile(sizeToShow, fileType, this.addFile.files[0]);
            }
            console.log(this.addFile.files)
        }
    }

   checkBoxChange = () => {
        this.yesCheckBox.classList.toggle("hidden");
        this.checkBox.classList.toggle("agree");
   }

   checkTextFields = () => {
        if (this.textValidation.email === false || this.textValidation.msg === false)
            this.sendInfo.setAttribute('disabled', '');
        else
            this.sendInfo.removeAttribute('disabled');
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

            this.checkTextFields();
        }

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
        }

        else {
            const styles = window.getComputedStyle(this.msg);
            const currentMsgHeight = styles.height.substr(0,styles.height.indexOf('p'));
            this.msgGood.style.top = (Number(currentMsgHeight) - 25) + 'px';

            this.msgGood.classList.remove('hidden');
        }
   }

   msgCalculateHeight = () => {
        
        console.log('1' , this.msg.scrollHeight ,'and', this.oldScrollHeight)
    
        if ((this.msg.scrollHeight - this.oldScrollHeight) > 10) {
                
            this.msg.style.height = "1px";
            this.msg.style.height = (10 + this.msg.scrollHeight) + "px";
                
            this.oldScrollHeight = this.msg.scrollHeight;
        }

        console.log('2', this.msg.scrollHeight ,'and', this.oldScrollHeight)
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