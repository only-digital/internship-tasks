import Component from '../../app/js/base/component';

class OnlyForm extends Component {
    input;
    textArea;
    fileInput;
    fileKeeper;
    agreement;
    sendButtom;

    constructor(element) {
        super(element);

        const block = this.getElement('input-block');
        this.input = block.querySelector('.only-input');
        this.textArea = block.querySelector('.only-text-area');
        this.fileInput = block.querySelector('.only-file-input');
        this.agreement = block.querySelector('.only-agreement');
        this.sendButtom = block.querySelector('.only-btn');
        this.fileKeeper = block.querySelector('.only-file-input__hidden');

        this.sendButtom.setAttribute('disabled','disabled');
        
        this.root.addEventListener('fileCheck', this.checkValidate);
        this.root.addEventListener('agreementClick',this.checkValidate);
        this.root.addEventListener('checkInput',this.checkValidate);
        this.root.addEventListener('checkArea',this.checkValidate);
        this.sendButtom.addEventListener('click',this.sendForm);
    }

    checkValidate=()=>{
        if(this.input.classList.contains('only-input_validate')
        &&this.agreement.classList.contains('only-agreement_validate')
        &&this.fileInput.classList.contains('only-file-input_validate')
        &&this.textArea.classList.contains('only-text-area_validate')){
            this.sendButtom.removeAttribute('disabled');
        }
        else{
            this.sendButtom.setAttribute('disabled','disabled');
        }
    }

    sendForm=async()=>{
        const form = new FormData();
        form.append('email',this.input.value);
        form.append('text',this.textArea.value);
        form.append('agreement',this.agreement.checked);
        for(let f of this.fileKeeper.files){
            form.append(f.name,f);
        }

        try{
            const resp = await fetch('/form',{
                method:'POST',
                headers:{
                    "Content-Type":'application/json'
                },
                body:form
            });  
            if(resp.ok){
                const parsed = await resp.text();
                console.log(parsed);
            }  
        }
        catch(e){
            console.log(e);
        }
    }
}

export default OnlyForm