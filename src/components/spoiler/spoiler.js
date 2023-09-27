import Component from "../../app/js/base/Component";

class Spoiler extends Component {
  header;
  text;
  isOpen = false;

  constructor(element) {
    super(element);
    this.header = this.getElement("header");
    this.text = this.getElement("text");
    this.text.style.height = "0";
    this.header.addEventListener("click", this.onButtonClick);
  }

  onButtonClick = () => {
    this.header.classList.toggle("spoiler__header_active");

    if (this.isOpen) {
      this.text.style.height = "0";
      this.isOpen = false;
    } else {
      this.text.style.height = `${this.text.scrollHeight}px`;
      this.isOpen = true;
    }
  };
}

export default Spoiler;
