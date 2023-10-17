import Component from "../../../../../app/js/base/Component";

class flie extends Component {
    icon;
    removeFile;
    id;
    constructor(element) {
        super(element)
        this.removeFile = element.delete;
        this.id = element.id
        this.icon = this.getElement("icon")
        this.icon.addEventListener("click",this.deleteRoot);
    }
    deleteRoot = () => {
        this.root.remove();
        this.removeFile(this.id);
    }
}

export default flie;