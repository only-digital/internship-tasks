import Component from '../../../app/js/base/Component';
import inputMailCt from "./input-mail-ct/input-mail-ct";
import textareaCt from "./textarea-ct/textarea-ct";
import inputFileCt from "./input-file-ct/input-file-ct";
import confCheckboxCt from "./conf-checkbox-ct/conf-checkbox-ct";

const childComponentKeys = { button: "button", checkbox: "conf-checkbox-ct", file: "input-file-ct", mail: "input-mail-ct", message: "textarea-ct" };
const formKeys = { button: "button", checkbox: "checkbox", file: "file", mail: "mail", message: "message" }
//константы для избежания ошибок с отпечатками

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
        this.formElements = this.root.elements;
        this.initRootElements();
        this.updateEvents = {
            "conf-checkbox-ct": this.onCheckboxUpdate,
            "input-file-ct": this.onFileUpdate,
            "input-mail-ct": this.onMailUpdate,
            "textarea-ct": this.onMesegeUpdate
        }
        this.initChildComponentsJs();
        this.allert = this.getElement("alert")

        // this.toggleFormDisabling("on");
        this.root.addEventListener("submit", this.onSubmit);
    }

    initRootElements = () => {
        Array.from(this.root.children).forEach((block) => {
            const blockName = block.classList[0];
            this.childElementsLink[blockName] = block;
        })
    }

    initChildComponentsJs = () => {
        Object.values(childComponentKeys).forEach((key) => {
            if (childClass[key] !== undefined)
                return (
                    new childClass[key]({
                        name: key,
                        component: this.childElementsLink[key],
                        sendDataToForm: this.updateEvents[key]
                    })
                )
        });
    };

    onFileUpdate = (value) => {
        this.formStates[childComponentKeys.file] = value;
    }

    onCheckboxUpdate = (value) => {
        this.formStates[childComponentKeys.checkbox] = value;

    }

    onMailUpdate = (value) => {
        this.formStates[childComponentKeys.mail] = value;
        this.MailAndMessageVerify();
    }

    onMesegeUpdate = (value) => {
        this.formStates[childComponentKeys.message] = value;
        this.MailAndMessageVerify();
    }

    MailAndMessageVerify = () => {
        const mailState = this.formStates[childComponentKeys.mail];
        const messageState = this.formStates[childComponentKeys.message];
        if (mailState && messageState) {
            this.toggleFormDisabling("off")
            return
        }
        this.toggleFormDisabling("on")
    }

    toggleFormDisabling(action) {
        if (action === "on") {
            this.childElementsLink[childComponentKeys.file].classList.add(`${childComponentKeys.file}_disabled`);
            this.formElements[formKeys.file].disabled = true;

            this.childElementsLink[childComponentKeys.checkbox].classList.add(`${childComponentKeys.checkbox}_disabled`);
            this.formElements[formKeys.checkbox].disabled = true;

            this.formElements[formKeys.button].disabled = true;
            return
        }
        this.childElementsLink[childComponentKeys.file].classList.remove(`${childComponentKeys.file}_disabled`);
        this.formElements[formKeys.file].disabled = false;

        this.childElementsLink[childComponentKeys.checkbox].classList.remove(`${childComponentKeys.checkbox}_disabled`);
        this.formElements[formKeys.checkbox].disabled = false;

        this.formElements[formKeys.button].disabled = false;
    }

    onSubmit = async (event) => {
        event.preventDefault();
        if (!this.formStates[childComponentKeys.checkbox]) {
            this.allert.innerText = "Примите пользовательское соглошение";
            this.allert.classList.add("form__alert_active");
            return
        }
        if (!this.formStates[childComponentKeys.mail]) {
            this.allert.innerText = "Поле почты должно быть заполнено";
            this.allert.classList.add("form__alert_active");
            return
        }
        if (!this.formStates[childComponentKeys.message]) {
            this.allert.innerText = "Поле сообшение должно быть заполнено";
            this.allert.classList.add("form__alert_active");
            return
        }
        //Проверку message и mail можно было и не делать но пусть будут.
        this.allert.classList.remove("form__alert_active");

        const reponse = await this.senData();
        this.disablingAllFormElements();
        this.removeButton("removeButton");
        this.createSuccsesMessage();
    }

    senData = async () => {
        return fetch("/form", {
            method: "POST",
            headers: { 'Content-Type': 'multipart/form-data' },
            body: JSON.stringify(this.formStates)
        })
    }

    removeButton = (action) => {
        this.childElementsLink[childComponentKeys.button].remove()
    }

    createSuccsesMessage = () => {
        const succsesHTML = document.createElement("div");
        succsesHTML.classList = "succses-send form__succses-send";
        this.root.appendChild(succsesHTML);
        succsesHTML.innerHTML += genereteSucssesInnerHTML();
    }

    disablingAllFormElements = () => {
        for (const formElement of Object.values(formKeys)) {
            const componentKey = childComponentKeys[formElement]
            this.childElementsLink[componentKey].classList.add(`${componentKey}_disabled`);
            this.formElements[formElement].disabled = true;
        }
    }
}

function genereteSucssesInnerHTML(props) {
    return `
        <svg class=succses-send_icon focusable=false>
            <use xlink:href="#input-confirm-svg""></use>
        </svg>
        <span class=succses-send_text>
            Форма успешно отправлена
        </span>         
    `
}

export default form