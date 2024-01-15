import Component from "../../app/js/base/component";

class TextField extends Component {
  textAreaElement;

  textAreaOkIcon;
  constructor(element) {
    super(element);
    this.textAreaElement = this.root.querySelector(".my-textarea");

    this.textAreaOkIcon = this.root.querySelector(
      ".text-field__textarea-ok-icon"
    );
    this.textAreaElement.addEventListener("input", () =>
      this.autoGrow(this.textAreaElement)
    );
  }
  autoGrow = (element) => {
    element.style.height = "5px";
    element.style.height = element.scrollHeight + 14 + "px";
    element.parentNode.style.marginBottom = element.scrollHeight - 48 + "px";

    this.textAreaOkIcon.style.top = element.scrollHeight - 30 + "px";
  };
}

export default TextField;
