import Component from "../../app/js/base/component";

class HeaderComponent extends Component {
  url;
  watchCount;
  applicationsCount;

  constructor(element) {
    super(element);

    this.url = "/stats";
    this.watchCount = this.getElement("watch-count");
    this.applicationsCount = this.getElement("applications-count");

    this.fetchVacancyData().then((data) => {
      this.watchCount.textContent = `Просмотров: ${data.views}`;
      this.applicationsCount.textContent = `Откликов: ${data.responses}`;
    });
  }

  fetchVacancyData = async () => {
    try {
      const res = await fetch("/stats");
      if (!res.ok) {
        throw new Error("Ошибка при получении данных о вакансии");
      }
      return await res.json();
    } catch (e) {
      console.log(e.message);
    }
  };
}

export default HeaderComponent;
