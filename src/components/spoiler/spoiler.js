import Component from "../../app/js/base/Component";

class Spoiler extends Component {
  constructor(element) {
    super(element);

    // Your code here
    this.root.addEventListener("click", this.onSpoilerExpose);
  }

  // Your code here

  onSpoilerExpose = () => {
    this.root.classList.toggle("active");
  };
}

export default Spoiler;
