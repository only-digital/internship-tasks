import Component from "../../app/js/base/Component";

class Spoiler extends Component {
  textElement;
  isOpened = false;

  constructor(element) {
    super(element);

    this.textElement = this.getElement("text");
    this.textElement.height = this.textElement.scrollHeight;
    this.textElement.style.height = 0;
    this.root.addEventListener("click", this.onActionClick);
  }

  onActionClick = () => {
    this.root.classList.toggle("active");
    if (this.isOpened) {
      this.textElement.style.height = 0;
      this.isOpened = !this.isOpened;
    } else {
      this.textElement.style.height = `${this.textElement.height}px`;
      this.isOpened = !this.isOpened;
    }
  };
}

export default Spoiler;
