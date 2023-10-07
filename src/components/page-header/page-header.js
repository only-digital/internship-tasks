import Component from "../../app/js/base/Component";

class PageHeader extends Component {
  statsElement;

  constructor(element) {
    super(element);
    this.statsElement = this.getElement("stats");

    document.addEventListener("DOMContentLoaded", this.renderData);
  }

  renderData = async () => {
    try {
      // get data
      const res = await fetch("/stats");
      const stats = await res.json();

      // set data
      this.setData(stats);
    } catch (err) {
      console.log('Hmmm, something gone wrong:', err);
    }
  };
  
  setData = (data) => {
    const fields = Object.keys(data);
    fields.forEach(el => {
      const targetElement = this.statsElement.querySelector(`[data-type="${el}"]`);
      targetElement.textContent = data[el];
    })
  }
}

export default PageHeader;
