import Component from '../../app/js/base/Component';

class FeedbackForm extends Component {
    form;
    sendingText;
    warningText;
    inputMail;
    inputConfirm;
    submitButton;
    sendingWrapper;
    formLoader;

    constructor(element) {
        super(element);

        this.form = this.getElement("inner");
        this.sendingText = this.getElement("sending-text");
        this.warningText = this.getElement("warning");
        this.inputMail = this.getElement("input");
        this.inputConfirm = this.getElement("input-confirm");
        this.submitButton = this.getElement("button");
        this.sendingWrapper = this.getElement("sending-wrapper");
        this.formLoader = this.getElement("loader");

        this.form.addEventListener("submit", this.handlingSubmitEvent)
    }

    getFormData = () => {
        let data = {
            email: this.inputMail.value,
            confirm: this.inputConfirm.checked
        }
        return data;
    }

    sendData = async (data) => {
        return await fetch("http://localhost:3000/form", {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify(data),
        })
    };

    connectLoader(meaning) {
        if(meaning) 
            this.formLoader.classList.add("active") 
        else 
            this.formLoader.classList.remove("active")
    }

    renderSendInfo = (responseStatus, res) => {
        res.then(data => {
            if (responseStatus === 422) {
                this.warningText.textContent = data.message;
                this.submitButton.classList.remove("successful");
                this.sendingWrapper.classList.remove("successful");
            } else if (responseStatus === 200) {
                this.submitButton.classList.add("successful");
                this.sendingWrapper.classList.add("successful");
                this.inputMail.disabled = true;
                this.inputConfirm.disabled = true;
                this.sendingText.textContent = data.message;
                this.warningText.textContent = "";
            }
        })
            .catch((error) => {
                console.log(error);
            })
            .finally(()=> {
                this.connectLoader(false);
            })

        return;
    }

    handlingSubmitEvent = async (e) => {
        e.preventDefault();
        let formData = this.getFormData();
        this.connectLoader(true);
        const response = await this.sendData(formData);
        const promis = response.json();
        this.renderSendInfo(response.status, promis);
    }
}

export default FeedbackForm