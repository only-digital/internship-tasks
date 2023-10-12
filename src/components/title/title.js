import Component from "../../app/js/base/Component";

class Title extends Component {
  viewCount;
  responseCount;

  constructor(element) {
    super(element);

    this.viewCount = this.getElement("view-count");
    this.responseCount = this.getElement("response-count");

    this.onFetch();
  }

  onFetch = () => {
    fetch("/stats")
      .then((response) => response.json())
      .then((data) => {
        const { views, responses } = data;
        this.viewCount.textContent = views;
        this.responseCount.textContent = responses;
      });
  };
}

export default Title;
