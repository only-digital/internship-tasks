import Component from "../../app/js/base/Component";

class DateNow extends Component {
  constructor(element) {
    super(element);
    this.setDate();
  }
  setDate() {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date().toLocaleDateString("ru-RU", options).slice(0, -2);
    this.root.innerHTML = date;
  }
}

export default DateNow;
