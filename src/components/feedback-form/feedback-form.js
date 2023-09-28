import Component from "../../app/js/base/Component";

class FeedbackForm extends Component {
  email;
  checkbox;
  loader;
  success;
  error;
  button;

  constructor(element) {
    super(element);

    this.email = this.getElement("input-field");
    this.checkbox = this.getElement("checkbox");
    this.loader = this.getElement("loader");
    this.success = this.getElement("success");
    this.error = this.getElement("error");
    this.button = this.getElement("submit");
    this.root.addEventListener("submit", this.onSubmit);
  }

  pushData = async (email, confirm) => {
    this.loader.classList.add("loading");
    this.button.classList.add("hidden");
    try {
      const res = await fetch("/form", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, confirm }),
      });
      const data = await res.json();
      if (res.status === 200) {
        this.root.classList.add("success");
        this.success.classList.remove("hidden");
        this.loader.classList.remove("loading");
        return;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      this.loader.classList.remove("loading");
      this.button.classList.remove("hidden");
      this.error.textContent = error.message;
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.error.textContent = "";

    this.pushData(email.value, this.checkbox.checked);
  };
}

export default FeedbackForm;
