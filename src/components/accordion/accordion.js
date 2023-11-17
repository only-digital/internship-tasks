import Component from "../../app/js/base/Component";

class Accordion extends Component {
  #height = 0;
  #hiddenClass = "accordion__hidden";
  #header;
  #content;
  #cross;
  constructor(element) {
    super(element);

    this.#header = this.getElement("block");
    this.#content = this.getElement("content");
    this.#cross = this.getElement("cross");

    const { height } = this.#content.getBoundingClientRect();
    this.#height = height;

    this.#content.style.height = "0px";

    this.#header.addEventListener("click", this.onToggleClass);
  }

  onToggleClass = () => {
    if (this.root.classList.contains(this.#hiddenClass)) {
      this.root.classList.remove(this.#hiddenClass);
      this.#content.style = `height: ${this.#height}px`;
      this.#cross.style.transform = "rotate(45deg)";
    } else {
      this.root.classList.add(this.#hiddenClass);
      this.#content.style.height = "0px";
      this.#cross.style.transform = "rotate(0deg)";
    }
  };
}

export default Accordion;
