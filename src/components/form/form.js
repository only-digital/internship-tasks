import Component from "../../app/js/base/component";

class Form extends Component {
  form;
  files;
  error;

  constructor(element) {
    super(element);

    this.form = this.getElement("wrap");
    this.files = this.form.querySelector(".file-button__input");
    this.error = this.form.querySelector(".file-button__error");
    this.modal = this.form.querySelector(".file-button__modal");

    this.form.addEventListener("submit", this.onSubmit);
  }

  onSubmit = async (e) => {
    e.preventDefault();
    this.error.textContent = "";
    this.modal.classList.remove("active");

    const formData = new FormData(this.form);
    formData.delete("file");
    Array.from(this.files.files).forEach((file) => {
      formData.append("file", file);
    });

    const respose = await fetch("/form", {
      method: "POST",
      body: formData,
    });

    if (respose.ok) {
      this.form.classList.add("disabled");
    }
    return respose;
  };
}

export default Form;
