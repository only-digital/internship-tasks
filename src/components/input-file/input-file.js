import Component from '../../app/js/base/Component';

class InputFile extends Component {
    constructor(element) {
        super(element);
        this.eventName = this.root.dataset.event;
        this.inputFile = this.getElement('input');
        this.fileError = this.getElement('error');
        this.inputFile.addEventListener('input',this.handleInputFile);
    }

    handleInputFile = (event) => {
        this.hideInputFilesError();
        this.removeFileInfoNodes();
        const files = event.target.files;
        let correctSize = true;
        let correctNumber = false;
        if (files.length>2) {
            this.showInputFilesError('Максимум 2 файла');
        } else correctNumber = true;

        for (const file of files){
            if (file.size>5000000) {
                this.showInputFilesError('Максимальный размер файла не более 5мб');
                correctSize = false;
                break;
            }
        }
        
        const fileInputIsCorrect = correctSize && correctNumber;

        if (fileInputIsCorrect) {
            this.inputFile.dispatchEvent(new CustomEvent(this.eventName,{
                detail: {
                    file:true
                }
            }));
            for (const file of files) {
                const fileSize = file['size'];
                const fileExtension = file['name'].split('.')[1];
                this.appendFileInfo(fileExtension,fileSize);
            }
        } else {
            this.inputFile.dispatchEvent(new CustomEvent(this.eventName,{
                detail: {
                    file:false
                }
            }));
        }
    }

    hideInputFilesError = () => {
        this.fileError.textContent = '';
        this.fileError.classList.add('form_invisible-elem');
    }

    removeFileInfoNodes = () => {
        const filesInfo = this.root.querySelectorAll('.file-info');
        for (const fileInfo of filesInfo) {
            const parentNode = fileInfo.parentNode;
            parentNode.removeChild(fileInfo);
        }
    }

    showInputFilesError = (errorDescription) => {
        this.fileError.classList.remove('input-file_invisible-elem');
        this.fileError.textContent = errorDescription;
    }

    hideInputFilesError = () => {
        this.fileError.textContent = '';
        this.fileError.classList.add('input-file_invisible-elem');
    }

    appendFileInfo = (fileExtension,fileSize) => {
        const fileInfoFragment = document.createDocumentFragment();
        const fileInfoRoot = document.createElement('div');
        fileInfoRoot.dataset.file=Date.now()+fileSize+fileExtension;
        fileInfoRoot.classList.add('file-info');
        const spanDoc = document.createElement('span');
        spanDoc.classList.add('file-info__span');
        spanDoc.innerText = 'Документ ';
        const spanExtension = document.createElement('span');
        spanExtension.classList.add('file-info__span');
        spanExtension.innerText = fileExtension+', ';
        spanExtension.classList.add('file-info__text_gray');
        const spanSize = document.createElement('span');
        spanSize.classList.add('file-info__span');
        spanSize.classList.add('file-info__text_gray');
        spanSize.innerText = this.bytesToKb(fileSize)+'kB';
        fileInfoRoot.appendChild(spanDoc);
        fileInfoRoot.appendChild(spanExtension);
        fileInfoRoot.appendChild(spanSize);
        fileInfoFragment.appendChild(fileInfoRoot);
        const svgRoot = document.createElement('div');
        svgRoot.classList.add('file-info__svg');
        svgRoot.addEventListener('pointerdown',this.handleFileInfoClick);
        this.renderIcon(svgRoot);
        fileInfoRoot.appendChild(svgRoot);
        this.root.appendChild(fileInfoFragment);
    }

    handleFileInfoClick = (event) => {
        const fileClickedId = event.target.parentNode.parentNode.dataset.file;
        const filesInfo = this.root.querySelectorAll('.file-info');
        for (const fileInfo of filesInfo) {
            if (fileInfo.dataset.file === fileClickedId) {
                const parentNode = fileInfo.parentNode;
                const svgRoot = fileInfo.querySelector('.file-info__svg');
                svgRoot.removeEventListener('pointerdown',this.handleFileInfoClick);
                parentNode.removeChild(fileInfo);
            }
        }
    }

    renderIcon = (node) => {
        const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const iconPath = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'path'
        );
        iconSvg.setAttribute('viewBox', '0 0 20 20');
        iconPath.setAttribute(
            'd',
            'M5.77495 15L10.0741 10.7008L14.2251 14.8518L14.8518 14.2251L10.7008 10.0741L15 5.77495L14.3733 5.14825L10.0741 9.44742L5.6267 5L5 5.6267L9.44742 10.0741L5.14825 14.3733L5.77495 15Z'
        );
        iconSvg.appendChild(iconPath);
        return node.appendChild(iconSvg);
    }

    bytesToKb = (bytes) => {
        return (bytes / 1024).toFixed(1);
    }
}

export default InputFile