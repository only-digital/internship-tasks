import Component from "../../app/js/base/component";

class Feedback extends Component {
  constructor(element) {
    super(element);

    this.VISIBILITY_HIDDEN_CLASS = "visibility-hidden";
    this.HIDDEN_CLASS = "hidden";
    this.DISABLED_CLASS = "disabled";

    this.inputBlock = this.getElement("email-wrap");
    this.cbBlock = this.getElement("cb-wrap");

    this.input = this.getElement("input-email");
    this.inputError = this.getElement("input-error");
    this.checkbox = this.getElement("cb");

    this.btn = this.getElement("btn");
    this.okMessage = this.getElement("message");

    this.loader = this.getElement("loader");

    this.btn.addEventListener("click", this.handleButtonClick);
  }

  handleButtonClick = (e) => {
    e.preventDefault();

    if (!this.input.value.trim()) return;
    if (!this.checkbox.checked) return;

    this.inputBlock.classList.add(this.DISABLED_CLASS);
    this.cbBlock.classList.add(this.DISABLED_CLASS);
    this.btn.classList.add(this.DISABLED_CLASS);

    this.inputError.classList.add(this.VISIBILITY_HIDDEN_CLASS);

    this.loader.classList.remove(this.HIDDEN_CLASS);

    fetch("/form", {
      method: "POST",
      body: JSON.stringify({
        email: this.input.value,
        confirm: this.checkbox.checked,
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((data) => {
        if (data.status === 422) {
          data.json().then((res) => {
            this.inputError.innerText = res.message;

            this.inputError.classList.remove(this.VISIBILITY_HIDDEN_CLASS);

            this.inputBlock.classList.remove(this.DISABLED_CLASS);
            this.cbBlock.classList.remove(this.DISABLED_CLASS);
            this.btn.classList.remove(this.DISABLED_CLASS);
          });
        }
        if (data.status === 200) {
          this.inputError.classList.add(this.VISIBILITY_HIDDEN_CLASS);

          this.btn.classList.add(this.HIDDEN_CLASS);
          this.okMessage.classList.remove(this.HIDDEN_CLASS);
        }
      })
      .catch((err) => console.log("err", err))
      .finally(() => {
        this.loader.classList.add(this.HIDDEN_CLASS);
      });
  };
}

export default Feedback;
