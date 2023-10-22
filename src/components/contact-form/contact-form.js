import Component from "../../app/js/base/component";

const EMAIL_REGEX =
    /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/;
const EMAIL_MAX_LENGTH = 255;
const MESSAGE_MAX_LENGTH = 1000;

class ContactForm extends Component {
    constructor(element) {
        super(element);

        this.email = this.getElement("email");
        this.emailInput = this.email.querySelector("input");
        this.emailError = this.email.querySelector(".input-field__error");

        this.message = this.getElement("message");
        this.messageInput = this.message.querySelector(
            ".textarea__label__input"
        );
        this.messageError = this.message.querySelector(".textarea__error");

        this.agreement = this.getElement("agreement");
        this.agreementInput = this.agreement.querySelector(".checkbox__input");

        this.submitButton = this.getElement("submit-button");

        this.validation = {
            email: false,
            message: true,
            agreement: false,
            files: true,
        };

        this.submitButton.addEventListener("click", this.handleSubmit);
        this.emailInput.addEventListener("blur", this.validateEmail);
        this.emailInput.addEventListener("input", this.handleEmailInput);
        this.messageInput.addEventListener("blur", this.validateMessage);
        this.messageInput.addEventListener("input", this.handleMessageInput);
        this.agreementInput.addEventListener(
            "change",
            this.handleAgreementChange
        );
    }

    validateForm = () => {
        if (Object.values(this.validation).every((val) => val === true)) {
            this.submitButton.removeAttribute("disabled");
        } else {
            this.submitButton.setAttribute("disabled", "true");
        }
    };

    validateEmail = () => {
        const value = this.emailInput.value;

        const setValid = () => {
            this.email.classList.add("input-field_valid");
            this.email.classList.remove("input-field_invalid");
            this.validation.email = true;
        };
        const setInvalid = (message) => {
            this.emailError.textContent = message;
            this.email.classList.remove("input-field_valid");
            this.email.classList.add("input-field_invalid");
            this.validation.email = false;
        };

        if (value === "") {
            setInvalid("Поле E-mail не должно быть пустым.");
        } else if (
            value.length <= EMAIL_MAX_LENGTH &&
            EMAIL_REGEX.test(value)
        ) {
            setValid();
        } else {
            setInvalid("Введите корректный E-mail");
        }
        this.validateForm();
    };

    handleEmailInput = () => {
        this.email.classList.remove("input-field_invalid", "input-field_valid");
    };

    validateMessage = () => {
        const value = this.messageInput.value;

        const setValid = () => {
            this.message.classList.add("textarea_valid");
            this.validation.message = true;
        };
        const setInvalid = (message) => {
            this.message.classList.remove("textarea_valid");
            this.message.classList.add("textarea_invalid");
            this.messageError.textContent = message;
            this.validation.message = false;
        };
        console.log(value);
        if (value.length > MESSAGE_MAX_LENGTH) {
            setInvalid("Сообщение не должно содержать более 1000 символов");
        } else {
            setValid();
        }
        this.validateForm();
    };

    handleAgreementChange = () => {
        this.validation.agreement = this.agreementInput.checked;
        this.validateForm();
    };

    handleMessageInput = () => {
        this.message.classList.remove("textarea_invalid", "textarea_valid");
    };

    handleSubmit = async () => {
        const form = this.getElement("form");
        const formData = new FormData(form);

        try {
            const res = await fetch("/form", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                alert("Форма отправлена!");
            } else {
                alert("Что-то пошло не так.");
            }
        } catch (error) {
            alert(error);
        }
    };

}

export default ContactForm;
