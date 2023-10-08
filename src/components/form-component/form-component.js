import Component from "../../app/js/base/component";

class FormComponent extends Component {
  url;
  form
  invalidEmail
  checkbox
  loader

  constructor(element) {
    super(element);

    this.url = "/form";
    this.form = this.getElement("form");
    this.invalidEmail = this.getElement("invalid-email");
    this.checkbox = this.getElement("checkbox-confirm");
    this.form.addEventListener("submit", this.handleSubmit);
    this.loader = this.getElement('loader');
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const newData = { confirm: this.checkbox.checked, email: data.email };
    try {
      this.root.classList.add("loading");
      this.invalidEmail.textContent = "";
      await this.sendData(newData);
      this.root.classList.remove("loading");
      this.root.classList.add("success");
    } catch (error) {
        this.root.classList.remove("loading");
        this.invalidEmail.textContent = error.message;
    }
  };

  sendData = async (data) => {
    const response = await fetch(this.url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }
    return json;
  };
}

export default FormComponent;
