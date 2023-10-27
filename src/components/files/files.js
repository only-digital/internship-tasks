import Component from '../../app/js/base/component';

class Files extends Component {
    input;
    sizeLimit;
    error;
    names;
    toManyFiles;
    constructor(element) {
        super(element);

       this.input = this.getElement('input');
       this.sizeLimit = 5 * 1024 * 1024;
       this.error = this.getElement('error');
       this.names = this.getElement('names');
       this.toManyFiles = false;
       console.log(this.names);
       console.log('sizeLimit is ' + this.sizeLimit);



       this.root.addEventListener('input', (e) => this.onFilesInput(e));
    }

    onFilesInput = (e) => {
        this.error.innerText = ''; //clear error message

        this.selectedFiles = Array.from(e.target.files);
        //dispay files in DOM
        this.selectedFiles.map(i => {
            this.names.innerHTML += `<div><span>${i.name.split('.')[0].slice(0, 8)}... </span><span>${i.name.split('.')[1].toUpperCase()}, ${(i.size / 1024 / 1024).toFixed(1)} kB</span></div>`;
        });
        
        if (this.selectedFiles.length > 2) {
            this.error.innerText += "Возможно прикрепить не более 2 файлов.";
            this.selectedFiles.map((file, index)  => {
                if (file.size >= this.sizeLimit) {
                    this.toManyFiles = true;
                }
            })
            if (this.toManyFiles) {
                this.error.innerText += " Размер каждого файла не должен превышать 5Mb.";
            }
            e.target.value = ""; // Clear the selected files
            this.names.innerHTML = ""; // Clear DOM 
        } else  if (this.selectedFiles.length <= 2) {
            this.selectedFiles.map((file, index)  => {
            if (file.size >= this.sizeLimit) {
                this.error.innerText += "Размер каждого файла не должен превышать 5Mb.";
                e.target.value = ""; // Clear the selected files
                this.names.innerHTML = ""; // Clear DOM 
            }
        }) 
        } 
    }
    
}

export default Files