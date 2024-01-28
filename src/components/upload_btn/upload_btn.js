import Component from '../../app/js/base/component';

class Upload_btn extends Component {
  inputUploadFile;
  fileContainer;
  cancelBtn;
  fileInfo;
  constructor(element) {
    super(element);

    this.inputUploadFile = document.querySelector('.upload_btn__upload-file');
    this.fileContainer = document.querySelector('.upload_btn__file-container');
    this.fileInfo = document.querySelector('.upload_btn__fileName');
    this.cancelBtn = document.querySelector('.upload_btn__cancel');

    this.root.addEventListener('change', this.onUploadFile);
  }

  onUploadFile = () => {
    const file = this.inputUploadFile.files[0];
    console.log(file.type);
    const fileExtension = file.type.split('/')[1].toUpperCase().slice(0, 3);
    const fileSize = Math.round(file.size / 1024);
    this.fileContainer.classList.add('upload_btn__file-container--active');
    this.fileInfo.textContent = `Документ ${fileExtension}, ${fileSize} kB`;
    this.cancelBtn.addEventListener('click', this.onCancel);
  };

  onCancel = () => {
    this.fileContainer.classList.remove('upload_btn__file-container--active');
    this.inputUploadFile.value = '';
  }

  // Your code here
}

export default Upload_btn;
