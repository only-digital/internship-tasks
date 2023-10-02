import Component from "../../app/js/base/Component";

class Spoiler extends Component {
    constructor(element) {
        super(element);

        this.root.addEventListener("click", this.onExtend);
    }

    onExtend = (e) => {
        if (e.target.classList.contains('spoiler__body')) return;
        e.currentTarget.classList.toggle("spoiler_expanded");
    };
}

export default Spoiler;
