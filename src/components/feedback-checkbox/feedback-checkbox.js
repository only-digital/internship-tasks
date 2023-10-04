import Component from "../../app/js/base/Component";

class FeedbackCheckbox extends Component {
  input;
  field;

  constructor(element) {
    super(element);

    this.input = this.getElement("input");
    this.field = this.getElement("field");
    this.field.addEventListener("click", this.onClick);
  }

  onClick = () => {
    this.input.click();
  };
}

export default FeedbackCheckbox;
