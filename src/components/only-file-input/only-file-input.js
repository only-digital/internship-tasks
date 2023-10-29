import Component from '../../app/js/base/component';

class OnlyFileInput extends Component {
    input;
    select;
    error;
    notify;

    constructor(element) {
        super(element);

        this.input = this.getElement('hidden');
        this.select = this.getElement('select');
        this.error = this.getElement('error');
        this.notify = this.getElement('notify');

        this.select.addEventListener('click',this.selectFiles);
        this.input.addEventListener('change',this.showFiles);
    }

    showError = (message)=>{
        this.root.classList.add('only-file-input_invalidate');
        this.root.classList.remove('only-file-input_validate');
        this.error.textContent=message;
    }

    reset = ()=>{
        this.root.classList.remove('only-file-input_validate');
        this.root.classList.remove('only-file-input_invalidate');
        this.root.classList.remove('only-file-input_show');
    }

    selectFiles = () => {
        this.reset();
        this.input.click();
    }
    
    showFiles = () =>{
        while(this.root.childNodes.length>3){
            this.root.removeChild(this.root.lastChild);
        }

        const available = /(\.pdf|\.doc|\.docx)$/i;
        let maxCount = 2;

        for(let f of this.input.files){
            
            if(maxCount==0){
                this.notify.textContent = 'Вы можете загрузить только 2 документа';
                this.root.classList.add('only-file-input_show');
                return;
            }

            if(!available.exec(f.name)){
                this.showError('Incorrect file type');
                this.input.value='';
                return;
            }

            if(Math.floor(f.size/1024)>5000){
                this.showError('The file must be less than 5 Mb');
                return;
            }

            const file = document.createElement('div');
            const fileText = document.createElement('span');
            const fileDesc = document.createElement('span');
            const fileIconContainer = document.createElement('div');
            const fileIcon = document.createElement('div');

            file.classList.add('only-file-input__file');
            fileText.classList.add('only-file-input__file-text');
            fileDesc.classList.add('only-file-input__file-desc');
            fileIconContainer.classList.add('only-file-input__file-icon-container');
            fileIcon.classList.add('only-file-input__file-icon');

            const dotIndex = f.name.lastIndexOf('.');
            const name = f.name.substring(0,dotIndex);
            let desc = `${f.name.substring(dotIndex+1)}, ${Math.floor(f.size/1024)}kB`;

            fileText.textContent = name;
            fileDesc.textContent= desc;

            fileIconContainer.append(fileIcon);
            file.append(fileText);
            file.append(fileDesc);
            file.append(fileIconContainer);

            const deleteFile=()=>{
                if(file.parentElement.childElementCount==2){
                    this.input.value='';
                }
                file.parentElement.removeChild(file);
            }

            fileIconContainer.addEventListener('click',deleteFile);

            this.root.append(file);

            maxCount--;
        }

        if(this.root.childNodes.length>2){
            this.root.classList.add('only-file-input_validate');
        }
    }
}

export default OnlyFileInput