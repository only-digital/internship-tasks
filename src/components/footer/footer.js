import Component from '../../app/js/base/Component';

const succsesHTML = (props) => {
    return (
        `
        <div class="sucsses-placeholder footer__sucsses-placeholder">
            <svg class="sucsses-placeholder-icon" focusable="false">
                <use xlink:href="#checked-svg"></use>
            </svg>
            <span class="sucsses-placeholder-text">Форма успешно отправлена</span>
        <div>
        `
    )
}

class Footer extends Component {
    form;
    formElements;
    inputCt;
    checkboxCt;
    button;
    loader;

    constructor(element) {
        super(element);
        this.form = this.getElement("form");
        this.inputCt = this.getElement("input-ct");
        this.checkboxCt = this.getElement("checkbox-ct");
        this.button = this.getElement("button");
        this.loader = this.getElement("loader");
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

    toggleLoader = () => {
        this.loader.classList.toggle("loader_active")
    }

    toggleFormDisable = () => {
        const inputClass = Array.from(this.inputCt.classList);
        if (inputClass.includes("input-ct_disabled")) {
            this.formElements.email.disabled = false;
            this.formElements.checkbox.disabled = false;
        }
        else {

            this.formElements.email.disabled = true;
            this.formElements.checkbox.disabled = true;
        }

        this.inputCt.classList.toggle("input-ct_disabled");
        this.checkboxCt.classList.toggle("checkbox-ct_disabled");

        this.button.classList.toggle("button_unvise");
    }

    changeForm = (response) => {
        if (response.status === 422) {
            this.inputCt.children[2].innerText = response.statusText;
            this.inputCt.classList.add("input-ct__alert_active");
            this.toggleFormDisable();
            return;
        }
        if (response.status === 200) {
            this.inputCt.classList.remove("input-ct__alert_active");
            this.button.remove();
            this.form.innerHTML += succsesHTML();
            return;
        }
    }

    onSubmit = async (event) => {
        event.preventDefault();
        const data = this.getData();

        this.toggleLoader();
        this.toggleFormDisable();
        const response = await this.sendData(data);
        this.toggleLoader();
        this.changeForm(response);
    }
}

export default Footer