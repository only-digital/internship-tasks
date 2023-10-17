import Component from "../../../../app/js/base/Component";

class confCheckboxCt extends Component {
    input;
    onCeckboxUpdate;
    fakeCheckbox;

    constructor(element) {
        super(element)
        this.onCeckboxUpdate = element.onUpdate;
        this.input = this.getElement("checkbox");
        this.fakeCheckbox = this.getElement("fake-checkbox")

        this.input.addEventListener("input",this.onCheck);
    }

    onCheck = () => {
        this.fakeCheckbox.classList.toggle("conf-checkbox-ct__fake-checkbox_checked")
        this.onCeckboxUpdate(this.input.checked);
    }
}

export default confCheckboxCt