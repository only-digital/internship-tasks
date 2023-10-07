import Component from "../../app/js/base/Component";

class Header extends Component {
  URL;
  loader;
  views;
  responses;
  
  constructor(element) {
    super(element);
    this.URL = "/stats";
    this.loader = this.getElement("loader");
    this.views = this.getElement("info_views");
    this.responses = this.getElement("info_responses");
    
    document.addEventListener('DOMContentLoaded',this.getFetching());
  }

  getFetching = async () => {
    this.addLoader();

    try {
      const response = await fetch(this.URL, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      this.addStats(json);

    } catch (error) {
      console.log(error);

    } finally {
      this.removeLoader();
    }
  };

  addLoader() {
    this.loader.classList.add("loading");
  }

  removeLoader() {
    this.loader.classList.remove("loading");
  }

  addStats({ views, responses }) {
    this.views.textContent = `Просмотров: ${views}`;
    this.responses.textContent = `Откликов: ${responses}`;
  }
}

export default Header;
