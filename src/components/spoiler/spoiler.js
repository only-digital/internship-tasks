import Component from "../../app/js/base/component";

class Spoiler extends Component {
  constructor(element) {
    super(element);

    this.root.addEventListener("click", this.handleClick);
  }

  handleClick = () => {
    const content = this.getElement("content");
    const parent = content.parentElement;

    if (parent.classList.contains("spoiler-show")) {
      parent.classList.remove("spoiler-show");
      content.style.maxHeight = "";
    } else {
      parent.classList.add("spoiler-show");
      content.style.maxHeight = `${content.scrollHeight}px`;
    }
  };
}

export default Spoiler;
