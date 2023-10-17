import Component from '../../../../app/js/base/Component';
import File from "./file/file";

class inputFileCt extends Component {
    input;
    alert;
    clue;
    fileCt;
    files = {};
    onFilesChange;

    constructor(element) {
        super(element);
        this.onFilesChange = element.onUpdate;
        this.input = this.getElement("input");
        this.alert = this.getElement("alert");
        this.clue = this.getElement("clue");
        this.fileCt = this.getElement("file-ct");
        this.sendBt = this.getElement("send-bt");

        this.input.addEventListener("input", this.onFileSelect)
    }

    onFileSelect = () => {
        const file = this.input.files[0];
        const size = file?.size / 1000;

        if (file === undefined) {
            this.sendAllert("Файл не выбран")
            return;
        }

        if (size > 5000) {
            this.sendAllert("Максимальный размер файла 5 мб");
            return;
        }

        if (this.files[file.name] !== undefined) {
            this.sendAllert("Этот файл уже добавлен")
            return;
        }

        this.addFile(file, size);

        if (Object.keys(this.files).length === 2) {
            this.input.disabled = true;
            this.sendBt.classList.add("input-file-ct__send-bt_disabled");
        }
    }

    sendAllert = (message) => {
        this.alert.innerText = message;
        this.alert.classList.add("input-file-ct__alert_active");
    }

    addFile = (file, size) => {
        this.alert.classList.remove("input-file-ct__alert_active");
        this.files[file.name] = file;

        const fileProps = {
            fileName: file.name,
            fileType: file.type,
            fileSize: size > 1000
                ? `${(size / 1000).toFixed(1)} мБ`
                : `${size.toFixed(1)} kb`,
            fileId: file.name
        }
        this.createFileHTML(fileProps);
        this.onFilesChange(Object.values(this.files));
    }

    createFileHTML = (fileProps) => {
        const fileHTMLFoundation = document.createElement("span");
        fileHTMLFoundation.id = fileProps.fileId;
        fileHTMLFoundation.classList = "file";
        this.fileCt.appendChild(fileHTMLFoundation);
        const fileHTMLLink = document.getElementById(fileProps.fileId);
        fileHTMLLink.innerHTML += generateFileCtHTML(fileProps);
        return (new File({ name: "file", component: fileHTMLLink, delete: this.deleteFile, id: fileProps.fileId }))
    }

    deleteFile = (FileKey) => {
        delete this.files[FileKey];
        this.input.disabled = false;
        this.sendBt.classList.remove("input-file-ct__send-bt_disabled");
        this.onFilesChange(Object.values(this.files));
    }
}

function generateFileCtHTML(props) {
    return `
        <span class="file__text">
            ${props.fileName}
            <span class="file__text_gray"> 
                ${props.fileType}, ${props.fileSize}
            </span>
        </span>
        <svg class="file__icon", "focusable"="false">
            <use xlink:href="#plusIcon-svg""></use>
        </svg>;     
  `;
}

//Я не стал вручную jade компоненту перевадить в html а просто попросил 
//у ChatGPT сделать функцию которая возврашает html. Подправил его косяки
//укоротил под себя и добавил функционал который мне нужен.

export default inputFileCt

