import Component from '../../app/js/base/component';

class Files extends Component {
    input;
    sizeLimit;
    error;
    names;
    isTooBig;
    selectedFiles;
    fileIndex;

    constructor(element) {
        super(element);

       this.input = this.getElement('input');
       this.sizeLimit = 5 * 1024 * 1024;
       this.error = this.getElement('error');
       this.names = this.getElement('names');
       this.selectedFiles = [];
       this.isTooBig = false;
       this.state = element.state;
       this.fileIndex = undefined;


       this.root.addEventListener('input', (e) => this.onFilesInput(e));
       
    }

    onFilesInput = (e) => {
        
        this.error.innerText = ''; //clean error message
        this.names.innerHTML = ''; //clean DOM
        this.selectedFiles = [...this.state.files, ...Array.from(e.target.files)];
        //this.selectedFiles = Array.from(e.target.files);
        
        this.root.setAttribute('data-valid', 'true');
        
        this.selectedFiles.map(i => {
            this.names.innerHTML += `<div class="files__files-button"><span class="files__name-span">${i.name.split('.')[0].slice(0, 8)}... </span><span class="files__info-span">${i.name.split('.')[1].toUpperCase()}, ${(i.size / 1024 / 1024).toFixed(1)} kB</span><svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.96928 15L10.2685 10.7008L14.4194 14.8518L15.0461 14.2251L10.8952 10.0741L15.1943 5.77495L14.5676 5.14825L10.2685 9.44742L5.82104 5L5.19434 5.6267L9.64176 10.0741L5.34258 14.3733L5.96928 15Z" fill="#002F6C"/>
        </svg></div>`;
        });
        
        if (this.selectedFiles.length > 2) {
            this.root.removeAttribute('data-valid');
            this.error.innerText += "Возможно прикрепить не более 2 файлов.";
            this.selectedFiles.map((file, index)  => {
                if (file.size >= this.sizeLimit) {
                    this.isTooBig = true;
                }
            })
            if (this.isTooBig) {
                this.error.innerText += " Размер каждого файла не должен превышать 5Mb.";
            }
            e.target.value = ""; // Clean the selected files
            this.names.innerHTML = ""; // Clean DOM 
            this.selectedFiles = []; 
            this.state.setState([]); // Clean State

        } else  if (this.selectedFiles.length <= 2) {
            this.selectedFiles.map((file, index)  => {
            if (file.size >= this.sizeLimit) {
                this.root.removeAttribute('data-valid');
                this.error.innerText += "Размер каждого файла не должен превышать 5Mb.";
                e.target.value = ""; // Clean the input files
                this.names.innerHTML = ""; // Clear DOM 
                this.selectedFiles = []; 
                this.state.setState([]); // Clean State

            }
        }) 

        } 
        this.filesButtons = this.getElements('files-button');
        this.filesButtons.forEach(f => f.addEventListener('click', this.handleDelete));
        this.state.setState(this.selectedFiles);
       
    }

    handleDelete = (e) => {
        this.names = this.getElement('names');
        this.fileIndex = Array.from(this.names.children).indexOf(e.target.closest('.files__files-button'));
       
        this.state.setState(this.state.files.slice(0, this.fileIndex).concat(this.state.files.slice(this.fileIndex + 1)));
        
        e.target.closest('.files__files-button').removeEventListener('click', this.handleDelete);
        e.target.closest('.files__files-button').remove();
        
    }
    
}

export default Files