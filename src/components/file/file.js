import Component from '../../app/js/base/component';

// массив файлов будем хранить в глобальной переменной, чтобы получить к нему доступ при отправке формы 
// т.к. input[type="file"] - хранит только последний загруженный файл(ы)
// какие еще варианты есть?
window.myFiles = []

class File extends Component {
    list;
    inputFile;
    error;
    maxCountFiles = 2;
    maxFileSize = 5 * 1024 * 1024;
    whiteListExt = ["pdf", "doc", "docx"];

    constructor(element) {
        super(element);

        this.list = this.getElement("list")
        this.error = this.getElement("error")
        this.list.addEventListener('click', this.removeFile)
        this.inputFile = this.getElement("input")
        this.inputFile.addEventListener('change', this.addFiles)
    }


    msgError = (bool, msg = '') => {
        if(bool) {
            this.root.classList.add('error')
            this.error.textContent = msg
            this.inputFile.value = ''
        }
        else {
            this.root.classList.remove('error')
            this.error.textContent = msg
        }
        return !bool
    }

    fileIsValid = (files) => {
        if (window.myFiles.length + files.length > this.maxCountFiles) 
            return this.msgError(true, `Можно загрузить только ${this.maxCountFiles} файла. Попробуйте еще раз.`)

        for (const f of files) {
            if (window.myFiles.filter((myF) => myF.name === f.name).length)
                return this.msgError(true, `Файл с именем: ${f.name} уже добавлен!`)

            if (f.size > this.maxFileSize)
                return this.msgError(true, "Размер каждого файла не должен превышать 5Mb")

            if (this.whiteListExt.includes(this.getExt(f.name)) === false)
                return this.msgError(true, "Допустимые форматы прикрепляемых файлов: .pdf, .doc, .docx")
        }

        return this.msgError(false)
    }

    addFiles = (e) => {
        if(this.fileIsValid(e.target.files) === false) return;

        let htmlFiles = ''
        for (const file of e.target.files) {
            htmlFiles += this.renderHtmlFile(file)
            window.myFiles.push(file)
        }
        this.list.insertAdjacentHTML("beforeend", htmlFiles)
        this.inputFile.value = ''
        this.fileToogleAttr()
    }

    removeFile = (e) => {
        e.preventDefault()
        if(e.target.closest(".file__item_btn")) {
            const currentFile = e.target.closest(".file__item")
            window.myFiles = window.myFiles.filter((f) => f.name !== currentFile.getAttribute('data-name'))
            currentFile.remove()
            this.fileToogleAttr()
        }
    }

    fileToogleAttr = () => {
        if(window.myFiles.length < this.maxCountFiles)
            this.inputFile.removeAttribute('disabled')
        else
            this.inputFile.setAttribute('disabled', true)
    }

    getExt = (fileName) => fileName.split('.').reverse()[0]
    getWithoutExt = (fileName) => fileName.split('.').slice(0, -1).join('.')

    formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) {
          return "0"
        } else {
          var k = 1024
          var dm = decimals < 0 ? 0 : decimals
          var sizes = ["байт", "КБ", "МБ", "ГБ", "ТБ"]
          var i = Math.floor(Math.log(bytes) / Math.log(k))
          return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
        }
      }

    renderHtmlFile = (f) => {
        return `
            <div class="file__item" data-name="${f.name}">
                <span class="file__item_name">${this.getWithoutExt(f.name)}</span>
                <span class="file__item_info">${this.getExt(f.name).toUpperCase()}, ${this.formatBytes(f.size)}</span>
                <button class="file__item_btn" tabindex="-1">
                    <span class="file__item_icon">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.774947 10L5.07412 5.70082L9.22505 9.85175L9.85175 9.22505L5.70082 5.07412L10 0.774946L9.3733 0.148249L5.07412 4.44742L0.626699 0L0 0.6267L4.44742 5.07412L0.148248 9.3733L0.774947 10Z" fill="currentColor"></path></svg>
                    </span>
                </button>
            </div>
        `
    }
}

export default File