import Component from "../../app/js/base/component";

class Spoiler extends Component {
  constructor(element) {
    super(element);

    this.linkElement = this.getElement("link");
    this.textElement = this.getElement("text");

    this.linkElement.addEventListener("click", this.onSpoilerClick);
  }

  onSpoilerClick = (e) => {
    e.preventDefault();

    if (this.root.classList.contains("spoiler_opened")) {
      this.textElement.removeAttribute("style");
      this.root.classList.remove("spoiler_opened");
    } else {
      this.textElement.style.height = this.textElement.scrollHeight + "px";
      this.root.classList.add("spoiler_opened");
    }
  };
}

export default Spoiler;
