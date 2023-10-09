import Component from '../../../../app/js/base/Component';

class textareaCt extends Component {
    input;
    name;

    constructor(element) {
        super(element);
        this.textareaCondintion = false;
        this.input = this.getElement("textarea");
        this.name = this.getElement("name");

        this.input.addEventListener("focus", this.onInputFocus)
        this.input.addEventListener("blur", this.onInputBlur)
        this.input.addEventListener("input", this.onInputChange)
    }

    onInputFocus = () => {
        this.name.classList.add("textarea-ct__name-active");
    }

    onInputChange = () => {
        this.root.classList.remove("textarea-ct_alert-active");
        this.root.classList.remove("textarea-ct_succses");
    }

    onInputBlur = () => {
        const inputValue = this.input.value;
        if (inputValue === "")
            this.name.classList.remove("textarea-ct__name-active");
        this.valueTest(inputValue);
    }

    valueTest = (value) => {
        if (value === "") {
            this.textareaCondintion = false;
            this.root.classList.add("textarea-ct_alert-active");
            return
        }
        this.textareaCondintion = true;
        this.root.classList.add("textarea-ct_succses");
    }
}

export default textareaCt