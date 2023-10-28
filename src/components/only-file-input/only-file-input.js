import Component from '../../app/js/base/component';

class OnlyFileInput extends Component {
    input;
    select;
    constructor(element) {
        super(element);

        this.input = this.getElement('hidden');
        this.select = this.getElement('select');

        this.select.addEventListener('click',this.selectFiles);
        this.input.addEventListener('change',this.showFiles);
    }

    selectFiles = () => {
        console.log('hhh');
        this.input.click();
    }
    
    showFiles = () =>{
        console.log(this.input.files);
        
        for(let f of this.input.files){
            console.log(f);
            
            const file = document.createElement('div');
            const fileText = document.createElement('span');
            const fileDesc = document.createElement('span');
            const fileIcon = document.createElement('div');
            //const icon = document.createElement('img');

            file.classList.add('only-file-input__file');
            fileText.classList.add('only-file-input__file-text');
            fileDesc.classList.add('only-file-input__file-desc');
            fileIcon.classList.add('only-file-input__file-icon');

           const dotIndex = f.name.lastIndexOf('.');
           const name = f.name.substring(0,dotIndex);
           let desc = `${f.name.substring(dotIndex+1)},${Math.floor(f.size/1024)}kB`;

           fileText.textContent = name;
           fileDesc.textContent= desc;

           // fileIcon.append(icon);
            file.append(fileText);
            file.append(fileDesc);
            file.append(fileIcon);

            this.root.append(file);
        }
        /* this.input.files.forEach(f => {

            console.log(f);

            const file = document.createElement('div');
            const fileText = document.createElement('span');
            const fileDesc = document.createElement('span');
            const fileIcon = document.createElement('div');
            const icon = document.createElement('img');

            file.classList.add('only-file-input__file');
            fileText.classList.add('only-file-input__file-text');
            fileDesc.classList.add('only-file-input__file-desc');
            fileIcon.classList.add('only-file-input__file-icon');
            icon.src='../../assets/icons/plus.svg';

            fileIcon.append(icon);
            file.append(fileText);
            file.append(fileDesc);
            file.append(fileIcon);

            this.root.append(file);
        }); */
    }
}

export default OnlyFileInput