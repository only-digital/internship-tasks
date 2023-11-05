import Component from '../../../app/js/base/Component';
import inputMailCt from "./input-mail-ct/input-mail-ct";
import textareaCt from "./textarea-ct/textarea-ct";
import inputFileCt from "./input-file-ct/input-file-ct";
import confCheckboxCt from "./conf-checkbox-ct/conf-checkbox-ct"

const childKeys = { button: "button", checkbox: "conf-checkbox-ct", file: "input-file-ct", mail: "input-mail-ct", message: "textarea-ct" };
const formKeys = { button: "button", checkbox: "checkbox", file: "file", mail: "mail", message: "message" }
//константы для избежания ошибок с отпечатком

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
    loader;
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

        this.toggleFormDisabling("on");
        this.root.addEventListener("submit", this.onSubmit);
    }

    initRootElements = () => {
        Array.from(this.root.children).forEach((block) => {
            const blockName = block.classList[0];
            this.childElementsLink[blockName] = block;
        })
    }

    initChildComponentsJs = () => {
        Object.values(childKeys).forEach((key) => {
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
        this.formStates[childKeys.file] = value;
    }

    onCheckboxUpdate = (value) => {
        this.formStates[childKeys.checkbox] = value;

    }

    onMailUpdate = (value) => {
        this.formStates[childKeys.mail] = value;
        this.MailAndMessageVerify();
    }

    onMesegeUpdate = (value) => {
        this.formStates[childKeys.message] = value;
        this.MailAndMessageVerify();
    }

    MailAndMessageVerify = () => {
        const mailState = this.formStates[childKeys.mail];
        const messageState = this.formStates[childKeys.message];
        if (mailState && messageState) {
            this.toggleFormDisabling("off")
            return
        }
        this.toggleFormDisabling("on")
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
    }

    onSubmit = async (event) => {
        event.preventDefault();
        this.toogleLoader("add");
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
        //Проверку message и mail можно было и не делать но считайте это подстроховкой 
        //на случай если кто то будет играться с inspect и обойдет ограничение кнопки
        this.allert.classList.remove("form__alert_active");

        const reponse = await this.senData();
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
        this.childElementsLink[childKeys.button].remove()
    }

    createSuccsesMessage = () => {
        const succsesHTML = document.createElement("div");
        succsesHTML.classList = "succses-send form__succses-send";
        this.root.appendChild(succsesHTML);
        const succsesLink = this.getElement("succses-send");
        succsesLink.innerHTML += genereteSucssesInnerHTML();
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