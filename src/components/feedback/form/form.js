import Component from '../../../app/js/base/Component';
import inputMailCt from "./input-mail-ct/input-mail-ct";
import textareaCt from "./textarea-ct/textarea-ct";
import inputFileCt from "./input-file-ct/input-file-ct";
import confCheckboxCt from "./conf-checkbox-ct/conf-checkbox-ct"

const childKeys = { button: "button", checkbox: "conf-checkbox-ct", file: "input-file-ct", mail: "input-mail-ct", message: "textarea-ct" };
const formKeys = { button: "button", checkbox: "checkbox", file: "file", mail: "mail", message: "message" }

const childClass = {
    "conf-checkbox-ct": confCheckboxCt,
    "input-file-ct": inputFileCt,
    "input-mail-ct": inputMailCt,
    "textarea-ct": textareaCt
}

class form extends Component {
    childElementsLink = {};
    formElements;
    updateEvents;
    allert;
    formStates = {
        "conf-checkbox-ct": false,
        "input-file-ct": false,
        "input-mail-ct": false,
        "textarea-ct": false
    };

    constructor(element) {
        super(element);
        this.initRootElements();
        this.initFormElements();
        this.updateEvents = {
            "conf-checkbox-ct": this.onCheckboxUpdate,
            "input-file-ct": this.onFileUpdate,
            "input-mail-ct": this.onMailUpdate,
            "textarea-ct": this.onMesegeUpdate
        }
        this.initChildComponentsJs();
        this.allert = this.getElement("alert")

        this.toggleFormDisabling("on");
        this.root.addEventListener("submit", this.onSubmit);
    }

    initFormElements = () => { this.formElements = this.root.elements };
    initRootElements = () => {
        Array.from(this.root.children).forEach((block) => {
            this.childElementsLink[block.classList[0]] = block;
        })
    }
    initChildComponentsJs = () => {
        Object.values(childKeys).forEach((key) => {
            if (childClass[key] !== undefined)
                return (
                    new childClass[key]({
                        name: key,
                        component: this.childElementsLink[key],
                        onUpdate: this.updateEvents[key]
                    })
                )
        });
    };

    onMailUpdate = (value) => {
        this.formStates[childKeys.mail] = value;
        this.MailMessageControle();
    }

    onMesegeUpdate = (value) => {
        this.formStates[childKeys.message] = value;
        this.MailMessageControle();
    }

    onFileUpdate = (value) => {
        this.formStates[childKeys.file] = value;
    }

    onCheckboxUpdate = (value) => {
        this.formStates[childKeys.checkbox] = value;
    }

    MailMessageControle = () => {
        const mailState = this.formStates[childKeys.mail];
        const messageState = this.formStates[childKeys.message];
        if (mailState && messageState) {
            this.toggleFormDisabling("off")
            return
        }
        this.toggleFormDisabling("on")
        return
    }

    toggleFormDisabling(action) {
        if (action === "on") {
            this.childElementsLink[childKeys.file].classList.add(`${childKeys.file}_disabled`);
            this.formElements[formKeys.file].disabled = true;

            this.childElementsLink[childKeys.checkbox].classList.add(`${childKeys.checkbox}_disabled`);
            this.formElements[formKeys.checkbox].disabled = true;

            this.formElements[formKeys.button].disabled = true;
            return
        }
        this.childElementsLink[childKeys.file].classList.remove(`${childKeys.file}_disabled`);
        this.formElements[formKeys.file].disabled = false;

        this.childElementsLink[childKeys.checkbox].classList.remove(`${childKeys.checkbox}_disabled`);
        this.formElements[formKeys.checkbox].disabled = false;

        this.formElements[formKeys.button].disabled = false;

        return
    }

    senData = async () => {
        return fetch("/form", {
            method: "POST",
            headers: { 'Content-Type': 'multipart/form-data' },
            body: JSON.stringify(this.formStates)
        })
    }

    onSubmit = async (event) => {
        event.preventDefault();
        if (!this.formStates[childKeys.checkbox]) {
            this.allert.innerText = "Примите пользовательское соглошение";
            this.allert.classList.add("form__alert_active");
            return
        }
        if (!this.formStates[childKeys.mail]) {
            this.allert.innerText = "Поле почты должно быть заполнено";
            this.allert.classList.add("form__alert_active");
            return
        }
        if (!this.formStates[childKeys.message]) {
            this.allert.innerText = "Поле сообшение должно быть заполнено";
            this.allert.classList.add("form__alert_active");
            return
        }
        this.allert.classList.remove("form__alert_active");
        
        const reponse = this.senData();
    }
}

export default form