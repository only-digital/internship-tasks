import Component from "../../app/js/base/Component";

class Statistic extends Component {

  constructor(element) {
    super(element);
    this.viewsBlock = this.getElement("views");
    this.responsesBlock = this.getElement("responses");
    this.loaderBlock = this.getElement("loader");
    this.getStatistic();
   
  }

  async getStatistic() {    
    const data = await fetch("/stats");
    const { views, responses } = await data.json();   
    this.viewsBlock.innerHTML = `Просмотров: ${views}`;
    this.responsesBlock.innerHTML = `Отликов: ${responses}`;
    if (data) {
      this.loaderBlock.style.display = "none";
    }
  }
}

export default Statistic;
