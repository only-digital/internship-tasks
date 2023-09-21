import Component from "../../app/js/base/Component";

class Spoiler extends Component {
  contentEl;
  constructor(element) {
    super(element);

    this.root.addEventListener("click", (e) => {
      if (e.target.classList.contains("spoiler__list-item__toggler")) {
        e.target.classList.toggle("opened");
      }
    });
  }
  // Your code here
}

export default Spoiler;
