import Component from "../../app/js/base/component";

const URL = "/stats";

class Header extends Component {
  constructor(element) {
    super(element);

    this.stats = this.getElement("stats").children;

    this.getStats();
  }

  getStats = async () => {
    try {
      this.showLoader(true);
      const response = await fetch(URL);

      if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
      }

      const json = await response.json();
      this.setStats(json.views, json.responses);
    } catch (error) {
      this.setError();
      console.error("[Fetch Error]:", error.message);
    } finally {
      this.showLoader(false);
    }
  };

  setStats = (views, responses) => {
    this.stats[2].textContent = `Просмотров: ${views}`;
    this.stats[3].textContent = `Откликов: ${responses}`;
  };

  setError = () => {
    this.stats[1].textContent = "К сожалению, статистика временно недоступна!";
    this.stats[1].classList.add("header__error_show");
  };

  showLoader = (isShow) => {
    if (isShow) {
      this.stats[0].classList.add("loader_show");
    } else {
      this.stats[0].classList.remove("loader_show");
    }
  };
}

export default Header;
