import Component from "../../app/js/base/component";

class TextField extends Component {
  textAreaElement;
  constructor(element) {
    super(element);
    this.textAreaElement = document.querySelector(".my-textarea");
    this.textAreaElement.addEventListener("input", () =>
      this.autoGrow(this.textAreaElement)
    );
  }
  autoGrow = (element) => {
    element.style.height = "5px";
    element.style.height = element.scrollHeight + 14 + "px";
    element.parentNode.style.marginBottom = element.scrollHeight + 14 + "px";
  };
}

export default TextField;
