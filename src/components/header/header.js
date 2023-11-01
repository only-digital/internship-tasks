import Component from '../../app/js/base/component';

class Header extends Component {
  constructor(element) {
    super(element);

    this.viewsElement = this.getElement('views');
    this.responsesElement = this.getElement('responses');

    fetch('/stats')
      .then((response) => response.json())
      .then((data) => {
        this.viewsElement.textContent = `Просмотров ${data.views}`;
        this.responsesElement.textContent = `Откликов ${data.responses}`;
      });
  }
}

export default Header;
