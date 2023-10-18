import Component from "../../app/js/base/component";

class FileInput extends Component {
    constructor(element) {
        super(element);

        this.MAX_FILENAME_LENGTH = 10;

        this.textElement = this.getElement("body__text");
        this.fileInput = this.getElement("input");
        this.inputBody = this.getElement("body");
        this.fileData = this.getElement("body__file-data");
        this.removeButton = this.getElement("body__remove-button");

        this.handleInputChange = (e) => {
            const selectedFile = e.target.files[0];

            if (selectedFile) {
                this.inputBody.classList.add("file-input__body_attachment");

                const formatFileName = (fileName) => {
                    if (fileName.length > this.MAX_FILENAME_LENGTH) {
                        return (
                            fileName.substring(0, this.MAX_FILENAME_LENGTH) +
                            "..."
                        );
                    } else {
                        return fileName.split(".")[0];
                    }
                };

                const getFileExtension = (fileName) =>
                    fileName.split(".").pop().toUpperCase();

                const formatFileSize = (number) => {
                    if (number < 1024) {
                        return `${number} bytes`;
                      } else if (number >= 1024 && number < 1048576) {
                        return `${(number / 1024).toFixed()} kB`;
                      } else if (number >= 1048576) {
                        return `${(number / 1048576).toFixed()} MB`;
                      }
                }

                const fileName = formatFileName(selectedFile.name);
                const fileExtension = getFileExtension(selectedFile.name);
                const fileSize = formatFileSize(selectedFile.size)
                
                this.textElement.textContent = fileName;
                this.fileData.textContent = ` ${fileExtension}, ${fileSize}`;
            } else {
                this.clearInput()
            }
        };

        this.fileInput.addEventListener("change", (e) =>
            this.handleInputChange(e)
        );

        this.clearInput = () => {
            this.fileInput.value = ""; // Set the value to an empty string
            this.inputBody.classList.remove("file-input__body_attachment");
            this.textElement.textContent = "Прикрепить файл";
        };

        this.removeButton.addEventListener("click", this.clearInput);
    }
}

export default FileInput;
