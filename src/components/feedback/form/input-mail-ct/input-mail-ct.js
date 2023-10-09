import Component from '../../../../app/js/base/Component';

class inputMailCt extends Component {
    input;
    name;

    constructor(element) {
        super(element);
        this.input = this.getElement("input");
        this.name = this.getElement("name");

        this.input.addEventListener("focus", onInputFocus())
        onInputFocus = () => { this.name.classList.add("input-mail-ct__name-active") }
    }

}

export default inputMailCt