import Component from "../../app/js/base/component";

class MainTitle extends Component {
  data;
  textElement;
  loaderHTML;

  constructor(element) {
    super(element);

    this.textElement = this.getElement("info");
    this.loaderHTML = document.createElement("div");
    this.loaderHTML.classList.add("loader");
    this.addElement();
  }

  getData = async () => {
    try {
      return await fetch("http://localhost:3000/stats").then((res) =>
        res.json()
      );
    } catch (error) {
      console.log(error);
    }
  };

  addElement = async () => {
    const element = this.textElement;
    element.append(this.loaderHTML);

    const viewsHTML = document.createElement("p");
    const resHTML = document.createElement("p");
    try {
      this.data = await this.getData();
      viewsHTML.textContent = `Просмотров: ${this.data.views}`;
      resHTML.textContent = `Откликов: ${this.data.responses}`;
      this.loaderHTML.remove();
      element.append(viewsHTML, resHTML);
    } catch (error) {
      console.log(error);
    }
  };
}

export default MainTitle;
