import Component from "../../app/js/base/component";

class SpoilerList extends Component {
  constructor(element) {
    super(element);

    this.root.addEventListener("click", this.handleClick);
  }

  handleClick = () => {
    const parent = event.target.closest(".spoiler");
    const content = parent.lastElementChild;

    if (parent.classList.contains("spoiler-show")) {
      parent.classList.remove("spoiler-show");
      content.style.maxHeight = "";
    } else {
      parent.classList.add("spoiler-show");
      content.style.maxHeight = `${content.scrollHeight}px`;
    }
  };
}

export default SpoilerList;
