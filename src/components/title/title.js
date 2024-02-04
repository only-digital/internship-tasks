import Component from "../../app/js/base/Component";

class Title extends Component {
  textElement;

  constructor(element) {
    super(element);

    // Your code here
  }

  // Your code here
  getStats = async () => {
    try {
      const response = await fetch("/stats");

      if (!response.ok) {
        throw new Error("Произошла ошибка при получении данных");
      }

      const json = await response.json();

      console.log("Полученные данные:" + json);

      document.querySelector(".views").textContent = json.views;
      document.querySelector(".responses").textContent = json.responses;
    } catch (e) {
      console.log(e);
    }
  };
}

export default Title;
