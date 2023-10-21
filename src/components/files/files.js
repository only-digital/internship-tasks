import Component from '../../app/js/base/component';

class Files extends Component {
    input;
    constructor(element) {
        super(element);

       this.input = this.getElement('input');
       this.root.addEventListener('input', (e) => this.onFilesInput(e));
    }

    onFilesInput = (e) => {
        this.selectedFiles = Array.from(e.target.files);
        console.log(this.selectedFiles.map(i => i.name)[0]);
        console.log(this.selectedFiles.map(i => i.name)[1]);
        if (this.selectedFiles.length > 3) {
            alert("You can only select up to 2 files.");
            e.target.value = ""; // Clear the selected files
          }
    }
    
}

export default Files