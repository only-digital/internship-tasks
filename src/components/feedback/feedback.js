import Component from "../../app/js/base/Component";
import checkForm from "../../utils/checkForm";

class Feedback extends Component {
  constructor(element) {
    super(element);

    this.form = this.getElement("form");

    this.EMAIL_VALID_CLASS = "email__valid";
    this.TEXTAREA_VALID_CLASS = "textArea__valid";

    this.email = document.querySelector(".email__input");
    this.emailBlock = document.querySelector(".email");

    this.textAreaBlock = document.querySelector(".textArea");

    this.fileInput = document.querySelector("#fileInput");
    this.filesList = document.querySelector(".fileInput__files-list");

    this.form.addEventListener("submit", this.handleSubmit);
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(this.form);

    formData.append("email", this.email.value);
    [...this.fileInput.files].forEach((file) =>
      formData.append("attachment", file)
    );

    try {
      const response = await fetch("/form", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.log("error", response.status);
      } else {
        console.log("response", response);

        this.form.reset();

        const event = new Event("change");

        this.fileInput.value = null;
        this.filesList.innerHTML = "";
        this.fileInput.dispatchEvent(event);

        this.emailBlock.classList.remove(this.EMAIL_VALID_CLASS);
        this.textAreaBlock.classList.remove(this.TEXTAREA_VALID_CLASS);

        checkForm();
      }
    } catch (error) {
      console.error("error", error);
    }
  };
}

export default Feedback;
