import Component from "../../app/js/base/Component";

class Vacancy extends Component {
    constructor(element) {
        super(element);

        this.viewCountElement = this.getElement("view-count");
        this.responseCountElement = this.getElement("response-count");
        this.statSpinners = document.querySelectorAll(
            ".vacancy__spinner-stats"
        );

        this.warningMessageElement = this.getElement("warning-message");
        this.successMessageElement = this.getElement("success-message");
        this.formElement = this.getElement("form");

        this.displayStats();
        this.formElement.addEventListener("submit", this.onSubmit);
    }

    getStats = async () => {
        const res = await fetch("/stats");
        const data = await res.json();
        return data;
    };

    displayStats = async () => {
        const stats = await this.getStats();

        this.viewCountElement.textContent = stats.views;
        this.responseCountElement.textContent = stats.responses;
        this.statSpinners.forEach(
            (spinner) => (spinner.style.display = "none")
        );
    };

    sendForm = async (data) => {
        try {
            const res = await fetch("/form", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const resData = await res.json();

            if (res.ok) {
                this.onSuccess(resData);
            } else {
                this.onError(resData);
            }
        } catch (err) {
            console.log(err);
        }
    };

    onSubmit = async (e) => {
        e.preventDefault();

        this.formElement.classList.add('loading')
        const formData = new FormData(e.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        this.sendForm(data);
    };

    onSuccess = (data) => {
        this.formElement.classList.add("successful");
        this.successMessageElement.textContent = data.message;
    };

    onError = (data) => {
        this.formElement.classList.remove('loading')
        this.warningMessageElement.textContent = data.message;
    };
}

export default Vacancy;
