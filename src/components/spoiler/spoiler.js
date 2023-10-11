import Component from "../../app/js/base/component";

class Spoiler extends Component {
  constructor(element) {
    super(element);

    this.root.addEventListener("click", this.onSpoilerExpose);
  }

  onSpoilerExpose = () => {
    this.root.classList.toggle("active");
  };
}

export default Spoiler;
