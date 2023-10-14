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
        this.addFile.addEventListener("input", this.showInputFile)

        this.email.addEventListener("input", this.emailFocus)
        this.msg.addEventListener("input", this.msgFocus)
        this.msg.addEventListener("input", this.msgCalculateHeight)
        this.checkBox.addEventListener("change", this.checkBoxChange)
    }

   showInputFile = () => {

        if (this.addFile.value)
        {


            //console.log(this.document)
           let file = this.createNewElement('div');
            console.log(file)
           // file.textContent = ';'
        }
            console.log(this.addFile.value);
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