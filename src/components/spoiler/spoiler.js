import Component from "../../app/js/base/Component";

class Spoiler extends Component {
  constructor(element) {
    super(element);
    this.root.addEventListener("click", this.handleClick);
  }
  handleClick = e => {
    e.currentTarget.classList.toggle("open");
    this.content = this.getElement("content");

    if (e.currentTarget.classList.contains("open")) {
      this.content.style.height = `${this.content.scrollHeight}px`;
    } else {
      this.content.style.height = `0px`;
    }
  };
}

export default Spoiler;
