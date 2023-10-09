import Component from "../../app/js/base/Component";

class Header extends Component {
  views;
  feedback;
  loader;
  constructor(element) {
    super(element);

    this.views = this.getElement("views");
    this.feedback = this.getElement("feedback");
    this.loader = this.getElement("loader");

    this.fetchStats();
  }

  async fetchStats() {
    try {
      const response = await fetch("/stats");
      const data = await response.json();

      this.updateUI(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      this.loader.style.display = "none";
    }
  }

  updateUI(data) {
    this.views.textContent = `Просмотров: ${data.views}`;
    this.feedback.textContent = `Откликов: ${data.responses}`;
  }
}

export default Header;
