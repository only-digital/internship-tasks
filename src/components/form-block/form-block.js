import Component from "../../app/js/base/Component";

class FormBlock extends Component {
  constructor(element) {
    super(element);

    this.form = this.getElement("form");
    this.inputError = this.getElement("input-error");
    this.checkbox = this.getElement("confirm-checkbox");
    this.form.addEventListener("submit", this.onSubmit);
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
		data["confirm"] = this.checkbox.checked
    try {
      this.inputError.textContent = null;
      this.root.classList.add("load");
      await this.send(data);
      this.root.classList.add("success");
    } catch (error) {
      this.root.classList.remove("load");
      this.inputError.textContent = error.message;
    }
  };

  send = async (data) => {
    const res = await fetch("/form", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message);
    }
    return json;
  }

  // Your code here
}

export default FormBlock;
