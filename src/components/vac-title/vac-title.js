import Component from "../../app/js/base/Component";

class VacTitle extends Component {
  views;
  responses;
  loader;

  constructor(element) {
    super(element);

    this.views = this.getElement("stats__views");
    this.responses = this.getElement("stats__responses");
    this.loader = this.getElement("loader");
    this.fetchStat().then((data) => {
      this.views.textContent = `Просмотров: ${data.views}`;
      this.responses.textContent = `Откликов: ${data.responses}`;
    });
  }

  fetchStat = async () => {
    this.loader.classList.add("loading");

    try {
      const res = await fetch("/stats", { method: "GET" });
      const data = await res.json();

      this.loader.classList.remove("loading");
      return data;
    } catch (error) {
      console.log(error);
    }
    this.loader.classList.remove("loading");
  };
}

export default VacTitle;
