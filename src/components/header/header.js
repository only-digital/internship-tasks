import Component from "../../app/js/base/Component";

class Header extends Component {
  viewsEl;
  responsesEl;
  constructor(element) {
    super(element);

    this.infoEl = this.getElement("info");
    this.viewsEl = this.getElement("info__views");
    this.responsesEl = this.getElement("info__responses");

    this.getStats().then(this.setStats);
  }

  getStats = async () => {
    this.infoEl.classList.add("loading");
    try {
      const res = await fetch("/stats");
      if (!res.ok) throw new Error("Ошибка получения статистики");
      return res.json();
    } finally {
      this.infoEl.classList.remove("loading");
    }
  };

  setStats = (stats) => {
    this.viewsEl.textContent = `Просмотров: ${stats.views}`;
    this.responsesEl.textContent = `Откликов: ${stats.responses}`;
  };
}

export default Header;
