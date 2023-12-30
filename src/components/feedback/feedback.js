import Component from "../../app/js/base/component";

class Feedback extends Component {
    feedBackForm;
    submitButton;
    errors;
    formResponse;
    formLoader;

    constructor(element) {
        super(element);

        this.feedBackForm = this.getElement("form");
        this.submitButton = this.getElement("form-button");
        this.errors = this.feedBackForm.querySelector(".input-text__error");
        this.formResponse = this.feedBackForm.querySelector(".form-response__text");
        this.formLoader = this.getElement("form-loader");
        this.submitButton.addEventListener("click", this.sendForm);
    }
    clearErrors (){
        this.errors.textContent = "";
    }
    sendForm = async (e) => {
        e.preventDefault();
        this.clearErrors();
        const emailValue = document.querySelector("form.feedback__form input#email").value;
        const isConfirm = document.querySelector("form.feedback__form input#confirm").checked;
        this.formLoader.classList.add("show");
        
        try {
            
            let response = await fetch("/form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({
                    email: emailValue,
                    confirm: isConfirm,
                }),
            });

            let result = await response.json();

            if (response.status === 200) {
                this.feedBackForm.classList.add("sent");
                this.formResponse.textContent = result.message;
            } else if (response.status === 422) {
                this.errors.textContent = result.message;
            }

        } catch (e) {
            console.log(e)
        }
        finally {    
            this.formLoader.classList.remove("show");
        }
        
    };
}

export default Feedback;
