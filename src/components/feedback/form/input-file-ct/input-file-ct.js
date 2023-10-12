import Component from '../../../../app/js/base/Component';

class inputFileCt extends Component {
    input;

    constructor(element) {
        super(element);
        this.input = this.getElement("input")
        this.input.addEventListener("input", this.onClick)
    }

    onClick = () => {
        this
        console.log(this.input.files);
    }
}
