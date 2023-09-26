import Component from "../../app/js/base/Component";

class Spoiler extends Component {
  contentEl;
  constructor(element) {
    super(element);

    this.root.addEventListener("click", this.onClick);
  }

  onClick = (e) => e.currentTarget.classList.toggle("opened");
}

export default Spoiler;
