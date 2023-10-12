import Component from '../../../../app/js/base/Component';

class inputMailCt extends Component {
    input;
    name;
    hekl;

    constructor(element) {
        super(element);
        this.inputMailCondintion = false;
        this.input = this.getElement("input");
        this.name = this.getElement("name");

        this.input.addEventListener("focus", this.onInputFocus);
        this.input.addEventListener("blur", this.onInputBlur);
        this.input.addEventListener("input", this.onInputChange);
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
        if (value === "1") {
            this.inputMailCondintion = true;
            this.root.classList.add("input-mail-ct_succses");
            return
        }
        this.inputMailCondintion = false;
        this.root.classList.add("input-mail-ct_alert-active");
    }
}

export default inputMailCt