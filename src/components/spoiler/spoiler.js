import Component from "../../app/js/base/Component";

class Spoiler extends Component {
  constructor(element) {
    super(element);
    this.root.addEventListener("click", this.onButtonClick);
  }

  onButtonClick = (event) => {
    let elem = event.target;
    if (
      elem.classList.contains("spoiler__row") ||
      elem.classList.contains("spoiler__row__cotent")
    ) {
      return;
    }

    const atribute = elem.getAttribute("data-row");
    if (atribute) {
      elem = elem.parentNode;
    }   
    
    if (elem.nodeName === "path") {
      elem = elem.parentNode.parentNode;
    }
   
    Array.from(elem.children).forEach((item) =>
      item.classList.toggle("active")
    );

    const height = elem.nextElementSibling.scrollHeight;

    if (elem.nextElementSibling.classList.contains("active")) {
      elem.nextElementSibling.style.height = "0px";
    } else {
      elem.nextElementSibling.style.height = `${height}px`;
    }
    elem.nextElementSibling.classList.toggle("active");
  };
}

export default Spoiler;
