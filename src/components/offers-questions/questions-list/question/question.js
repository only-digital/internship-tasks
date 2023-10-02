import Component from "../../../../app/js/base/Component";

class Question extends Component {
    dropdown;

    constructor(element) {
        super(element);
        this.dropdown = this.getElement("dropdown-ct");
        const title = this.getElement("title");
        title.addEventListener("click", this.onButtonClick);
        window.addEventListener("resize", this.onResize);
        this.onResize();
    }

    onButtonClick = () => {
        this.root.classList.toggle("question_active");
    }
    onResize = () => {
        const dropdownHeight = this.dropdown.scrollHeight;
        this.root.style.setProperty("--dropdownHeight",dropdownHeight+"px");
    }
}

export default Question
