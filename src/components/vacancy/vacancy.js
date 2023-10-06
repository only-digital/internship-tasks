import Component from "../../app/js/base/Component";

class Vacancy extends Component {
    constructor(element) {
        super(element);

        this.viewsElement = this.getElement("views");
        this.responsesElement = this.getElement("responses");
        this.updateStats();
    }

    getStats = async () => {
        const res = await fetch("/stats");
        const data = await res.json();
        return data;
    };

    updateStats = async () => {
        const stats = await this.getStats();

        this.viewsElement.textContent = stats.views;
        this.responsesElement.textContent = stats.responses;
    };
}

export default Vacancy;
