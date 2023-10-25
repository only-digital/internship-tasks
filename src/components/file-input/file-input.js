import Component from "../../app/js/base/component";

class FileInput extends Component {
    constructor(element) {
        super(element);

        this.MAX_FILENAME_LENGTH = 10;

        this.textElement = this.getElement("body__text");
        this.fileInput = this.getElement("input");
        this.inputBody = this.getElement("body");
        this.errorMessage = this.getElement("error");

        this.MAX_FILE_SIZE = this.fileInput.dataset.maxSize;
        this.MAX_FILES = this.fileInput.dataset.maxFiles;

        this.attachments = element.component.querySelectorAll(
            ".file-input__attachment"
        );

        element.component.addEventListener("click", (e) =>
            this.handleAttachmentClick(e)
        );

        this.fileInput.addEventListener("change", this.handleInputChange);
    }

    handleAttachmentClick = (e) => {
        if (
            e.target.classList.contains("file-input__attachment__remove-button")
        ) {
            this.clearInput();
        }
    };

    clearInput = () => {
        this.fileInput.value = "";
        this.attachments.forEach((att) => {
            att.style.display = "none";
        });
    };

    handleInputChange = (e) => {

        const files = [...e.target.files];

        const formatFileSize = (number) => {
            if (number < 1024) {
                return `${number} bytes`;
            } else if (number >= 1024 && number < 1048576) {
                return `${(number / 1024).toFixed()} kB`;
            } else if (number >= 1048576) {
                return `${(number / 1048576).toFixed()} MB`;
            }
        };

        const formatFileName = (fileName) => {
            if (fileName.length > this.MAX_FILENAME_LENGTH) {
                return (
                    fileName.substring(0, this.MAX_FILENAME_LENGTH) + "..."
                );
            } else {
                return fileName.split(".")[0];
            }
        };

        const getFileExtension = (fileName) =>
            fileName.split(".").pop().toUpperCase();

        // Validate files number
        if (files.length > this.MAX_FILES) {
            this.clearInput()
            this.errorMessage.textContent = `Вы можете загрузить только ${this.MAX_FILES} документа`;
            return;
        }

        // Validate file sizes
        for (let i = 0; i < files.length; i++) {
            if (files[i].size > this.MAX_FILE_SIZE) {
                this.fileInput.value = "";
                this.errorMessage.textContent = `Максимальный размер файла ${formatFileSize(
                    this.MAX_FILE_SIZE
                )}`;
                return;
            }
        }

        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const fileName = formatFileName(files[i].name);
                const fileExtension = getFileExtension(files[i].name);
                const fileSize = formatFileSize(files[i].size);

                this.attachments[i].querySelector(
                    ".file-input__attachment__name"
                ).textContent = fileName;
                this.attachments[i].querySelector(
                    ".file-input__attachment__file-data"
                ).textContent = ` ${fileExtension}, ${fileSize}`;
                this.attachments[i].style.display = "block";
            }

            this.errorMessage.textContent = "";
        } else {
            this.clearInput();
        }
    };
}

export default FileInput;
