import Component from "../../app/js/base/Component";

class Title extends Component {
  textElement;

  constructor(element) {
    super(element);

    // Your code here
    try {
      const response = fetch('/stats.json');
      if (response.ok){
        const responseData = response.text()
        document.getElementsByClassName('views').textContent =  responseData.views;
        document.getElementsByClassName('responses').textContent =  responseData.responses;
      } else {
        console.log('Нет ответа');
      }
    } catch (error) {
      console.error('Ощибка получения данных(title)', error);
    }


  }

  // Your code here
}

export default Title;
