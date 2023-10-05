import Component from '../../app/js/base/Component';

class Footer extends Component {
    form;
    formElements;
    inputMail;


    constructor(element) {
        super(element);
        this.form = this.getElement("form");
        this.inputMail = this.getElement("input-mail");
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
            this.inputMail.classList.add("input-mail__alert_active");
        } else if (status = 200) {
            this.inputMail.classList.remove("input-mail__alert_active");
            this.formElements.button.style.disabled = "true";
            console.log(this.formElements.button.style);
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