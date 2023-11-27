import Component from "../../app/js/base/Component";
import checkForm from "../../utils/checkForm";

class CheckBox extends Component {
  constructor(element) {
    super(element);

    this.cb = this.getElement("input");
    this.cb.addEventListener("click", this.handleCheckboxClick);
  }

  handleCheckboxClick = () => checkForm();
}

export default CheckBox;
