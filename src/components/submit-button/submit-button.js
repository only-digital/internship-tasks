import Component from "../../app/js/base/component";

class SubmitButton extends Component {
  constructor(element) {
    super(element);

    this.root.addEventListener("mousedown", (e) => {
      e.preventDefault();
    });
    this.root.addEventListener("mouseup", (e) => {
      e.target.focus();
    });
  }
}

export default SubmitButton;
