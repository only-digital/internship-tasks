import Component from "../../app/js/base/component";

class Textarea extends Component {
    constructor(element) {
        super(element);

        this.input = this.getElement("label__input");
        this.underline = this.getElement("label__underline");

        this.handleFocus = () => {
            this.underline.style.visibility = "hidden";
        };

        this.input.addEventListener("focus", this.handleFocus);
    }
}

export default Textarea;
