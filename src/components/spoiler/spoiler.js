import Component from "../../app/js/base/Component";

class Spoiler extends Component {
  textElement;
  titleElement;

  constructor(element) {
    super(element);
    this.titleElement = this.getElement('title')
    this.textElement = this.getElement('text')

    this.titleElement.addEventListener('click', this.onSpoilerClick)
  }

  onSpoilerClick = () => {
    this.root.classList.toggle('active')

    if (this.root.classList.contains('active')) {
      this.textElement.style.height = this.textElement.scrollHeight + 'px';
    } else {
      this.textElement.style.height = 0;
    }
  }
}

export default Spoiler;
