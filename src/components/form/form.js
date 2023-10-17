import Component from '../../app/js/base/Component';

class Form extends Component {
    constructor(element) {
        super(element);

        this.email = this.getElement('email');
        this.emailName = this.getElement('email-name');

        this.msg = this.getElement('msg');
        this.msgName = this.getElement('msg-name');

        this.checkBox = this.getElement('checkbox-input');
        this.yesCheckBox = this.getElement("checkbox-yes");

        this.addFile = this.getElement('file');
        this.wrapperAddFile = this.getElement('add-file');
        this.fileError = this.getElement('file-error');

        this.addFile.addEventListener("input", this.checkFileSize)

        this.email.addEventListener("input", this.emailFocus)
        this.msg.addEventListener("input", this.msgFocus)
        this.msg.addEventListener("input", this.msgCalculateHeight)
        this.checkBox.addEventListener("change", this.checkBoxChange)
    }

   showFile = (fileSize, fileType) => {

        const fileElSize = this.getElement('newFile').querySelector('.form__fileSize');
        const fileElType = this.getElement('newFile').querySelector('.form__fileType');
        fileElSize.textContent = ' ' + fileSize + ' kB';

        if (fileType.includes('/pdf'))
            fileElType.textContent = '.PDF';
        else if (fileType.includes('/msword'))
            fileElType.textContent = '.doc';
        else
            fileElType.textContent = '.docx';

    }

   checkFileSize = () => {

       this.fileError.classList.add('hidden');
       this.wrapperAddFile.classList.remove('error');

       const fileSize = this.addFile.files[0].size;
       const fileType = this.addFile.files[0].type;

        if (this.addFile.value)
        {
            if (fileSize > 5_242_880) //5МБ в байтах
            {
                this.fileError.classList.toggle('hidden');
                this.wrapperAddFile.classList.toggle('error');

                console.log('here')
                return; //добавить удаление этого файла
            }

            else
            {
                const sizeToShow =  Math.round((fileSize / 1024) * 10) / 10;
                console.log('gere')
                this.showFile(sizeToShow, fileType);
            }

        }
    }
   checkBoxChange = () => {
        this.yesCheckBox.classList.toggle("hidden");
        this.checkBox.classList.toggle("agree");

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

    msgCalculateHeight = () => {
        console.log(this.msg.scrollHeight)
        if (this.msg.scrollHeight > 120) {
            this.msg.style.height = "1px";
            this.msg.style.height = (16 + this.msg.scrollHeight) + "px";
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