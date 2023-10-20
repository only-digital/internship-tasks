import Component from "../../app/js/base/component";

class Header extends Component {
  constructor(element) {
    super(element);

    this.HEADER_OPACITY_CLASS = "header__wrap_opacity";
    this.HIDDEN_CLASS = "hidden";

    this.loader = document.querySelector(".loader");

    this.headerWrap = this.getElement("wrap");
    this.viewsElem = document.querySelector(".info__views_number");
    this.responseElem = document.querySelector(".info__response_number");

    this.getStats().then((data) => {
      this.setStats(data);
      this.hideLoader();
      this.showHeader();
    });
  }

  getStats = async () => {
    try {
      const res = await fetch("/stats");
      if (!res.ok) throw new Error(`Ошибка ${res.status}`);

      return await res.json();
    } catch (err) {
      console.log(err);
    }
  };

  setStats = ({ views, responses }) => {
    this.viewsElem.innerText = views;
    this.responseElem.innerText = responses;
  };

  hideLoader = () => this.loader.classList.add(this.HIDDEN_CLASS);

  showHeader = () => this.headerWrap.classList.remove(this.HEADER_OPACITY_CLASS);
}

export default Header;
