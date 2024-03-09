import Component from "../../app/js/base/Component";

class Title extends Component {
  textElement;

  constructor(element) {
    super(element);

    // Your code here
    this.methodTitle();
  }

  // Your code here
  async methodTitle() {
    const views = this.getElement("container__text__views");
    const responses = this.getElement("container__text__responses");

    try {
      const response = await fetch("/stats");

      if (!response.ok) {
        throw new Error("Произошла ошибка при получении данных");
      }

      const json = await response.json();

      console.log("Полученные данные:", json);

      views.textContent = json.views;
      responses.textContent = json.responses;
    } catch (e) {
      console.log(e);
    }
  }
}

export default Title;
