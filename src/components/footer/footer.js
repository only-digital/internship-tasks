import Component from '../../app/js/base/Component';

class Footer extends Component {
    form;
    formElements;
    inputCt;
    checkboxCt;
    button;
    succses;

    constructor(element) {
        super(element);
        this.form = this.getElement("form");
        this.inputCt = this.getElement("input-ct");
        this.checkboxCt = this.getElement("checkbox-ct")
        this.button = this.getElement("button");
        this.succses = this.getElement("sucsses-placeholder");
        this.initialFormElemts();

        this.form.addEventListener("submit", this.onSubmit);
    }

    initialFormElemts = () => {
        this.formElements = {}
        const tampleFormElements = this.form.elements;
        Array.from(tampleFormElements)
            .forEach((element) => {
                this.formElements[element.name] = element;
            })
    }

    getData = () => {
        const mail = this.formElements.email;
        const checkbox = this.formElements.checkbox;
        return {
            email: mail.value,
            confirm: checkbox.checked
        }
    }

    sendData = async (data) => {
        return await fetch('/form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
    }

    changeForm = (status) => {
        if (status === 422) {
            this.inputCt.classList.add("input-ct__alert_active");
            return;
        }
        if (status === 200) {
            this.inputCt.classList.remove("input-ct__alert_active");

            this.formElements.email.setAttribute("disabled", "true");
            this.formElements.checkbox.setAttribute("disabled", "true");

            this.inputCt.classList.add("input-ct_disabled");
            this.checkboxCt.classList.add("checkbox-ct_disabled");

            this.button.style.display = "none";
            this.succses.style.display = "flex";
            return;
        }
    }

    onSubmit = async (event) => {
        event.preventDefault();
        const data = this.getData();

        this.toggleLoader();
        const response = await this.sendData(data);
        this.changeForm(response.status);
        this.toggleLoader();
    }
}

export default Footer