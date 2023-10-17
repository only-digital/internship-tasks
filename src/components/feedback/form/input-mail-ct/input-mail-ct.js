import Component from '../../../../app/js/base/Component';

const emailRegex = /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/;
class inputMailCt extends Component {
    input;
    name;
    onMailUpdate;

    constructor(element) {
        super(element);
        this.input = this.getElement("input");
        this.name = this.getElement("name");
        this.onMailUpdate = element.onUpdate;

        this.input.addEventListener("focus", this.onInputFocus);
        this.input.addEventListener("input", this.onInputChange);
        this.input.addEventListener("blur", this.onInputBlur);
    }
    onInputFocus = () => {
        this.name.classList.add("input-mail-ct__name-active");
    }

    onInputChange = () => {
        this.root.classList.remove("input-mail-ct_alert-active");
        this.root.classList.remove("input-mail-ct_succses");
    }

    onInputBlur = () => {
        const inputValue = this.input.value;
        if (inputValue === "")
            this.name.classList.remove("input-mail-ct__name-active");
        this.valueTest(inputValue);
    }

    valueTest = (value) => {
        if (emailRegex.test(value)) {
            this.root.classList.add("input-mail-ct_succses");
            this.onMailUpdate(value);
            return
        }
        this.onMailUpdate(false);
        this.root.classList.add("input-mail-ct_alert-active");
    }
}

export default inputMailCt
