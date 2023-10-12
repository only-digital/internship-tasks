import Component from "../../app/js/base/component";

class Element extends Component {
  constructor(element) {
    super(element);
    this.root.addEventListener("click", this.onClick);
  }
  onClick = () => {
    this.root.classList.toggle("open");
  };
}

export default Element;
