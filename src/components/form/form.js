import Component from "../../app/js/base/component";

class Form extends Component {
  constructor(element) {
    super(element);
    this.form = this.getElement("container");
    this.caption = this.getElement("caption");
    this.email = this.getElement("email");
    this.checkbox = this.getElement("checkbox");
    this.acceptText = this.getElement("accept-text");
    this.link = this.getElement("link");
    this.loader = this.form.querySelector(".loader");
    this.message = this.getElement("message");
    this.button = this.form.querySelector(".button");
    this.success = this.form.querySelector(".success");

    this.form.addEventListener("submit", this.handleSubmit);
  }

  handleSubmit = () => {
    event.preventDefault();

    const data = {
      email: this.email.value,
      confirm: this.checkbox.checked,
    };

    this.sendForm(data);
  };

  sendForm = async (data) => {
    try {
      this.showLoader(true);
      this.hideButton(true);
      this.message.textContent = "";
      this.makeDisabled();

      const response = await fetch("/form", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok && response.status !== 422) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
      }

      const json = await response.json();

      if (response.status === 422) {
        this.setMessage(json.message, "red");
        this.makeDisabled();
        this.hideButton(false);
      } else if (response.status === 200) {
        this.setMessage(json.message, "green");
        this.showSuccess(true);
      }
    } catch (error) {
      console.error("[Fetch Error]:", error.message);
      this.makeDisabled();
      this.hideButton(false);
    } finally {
      this.showLoader(false);
    }
  };

  setMessage = (message, color) => {
    this.message.textContent = message;
    this.message.classList.add(`form__message_color_${color}`);
  };

  makeDisabled = () => {
    this.caption.classList.toggle("form__caption_disabled");
    this.email.classList.toggle("form__email_disabled");
    this.email.toggleAttribute("disabled");
    this.acceptText.classList.toggle("form__accept-text_disabled");
    this.link.classList.toggle("form__link_disabled");
    this.checkbox.classList.toggle("form__checkbox_disabled");
    this.checkbox.toggleAttribute("disabled");
  };

  hideButton = (isHide) => {
    if (isHide) {
      this.button.classList.add("button_hide");
    } else {
      this.button.classList.remove("button_hide");
    }
  };

  showLoader = (isShow) => {
    if (isShow) {
      this.loader.classList.add("loader_show");
    } else {
      this.loader.classList.remove("loader_show");
    }
  };

  showSuccess = (isShow) => {
    if (isShow) {
      this.success.classList.add("success_show");
    } else {
      this.success.classList.remove("success_show");
    }
  };
}

export default Form;
