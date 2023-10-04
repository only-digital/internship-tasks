import Component from "../../app/js/base/Component";

class FeedbackForm extends Component {
  email;
  message;
  files;
  policy;
  inputs = [];
  submit;

  constructor(element) {
    super(element);

    this.inputs.push(this.root.querySelector(".feedback-input"));
    this.inputs.push(this.root.querySelector(".feedback-textarea"));
    this.inputs.push(this.root.querySelector(".feedback-file"));
    this.policy = this.root.querySelector(".feedback-checkbox__input");
    this.email = this.root.querySelector(".feedback-input__field");
    this.message = this.root.querySelector(".feedback-textarea__area");
    this.files = this.root.querySelector(".feedback-file__input");
    this.submit = this.root.querySelector("#submit");
    this.root.addEventListener("submit", this.onSubmit);
    this.root.addEventListener("change", this.onChange);
    this.files.addEventListener("input", this.onFilesChange);
    this.validate();
  }

  onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();

    data.append("email", this.email.value);
    data.append("message", this.message.value);
    Array.from(this.files.files).forEach((file) => {
      data.append("file", file);
    });
    this.pushData(data);
  };

  onChange = () => {
    this.validate();
  };

  onFilesChange = () => {
    this.validate();
  };

  validate = () => {
    let isError = false;

    this.inputs.forEach((input) => {
      if (input.classList.contains("error")) isError = true;
    });

    if (!this.policy.checked) isError = true;

    if (this.email.value.length === 0) isError = true;

    if (this.message.length === 0) isError = true;

    this.submit.disabled = isError;
  };

  pushData = async (formData) => {
    try {
      const res = await fetch("/form", {
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        body: formData,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export default FeedbackForm;
