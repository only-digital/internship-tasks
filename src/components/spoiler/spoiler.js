import Component from '../../app/js/base/component';

class Spoiler extends Component {
  buttonElement;
  wrapperElement;
  isActive;

  constructor(element) {
    super(element);
    this.isActive = false;

    this.buttonElement = this.getElement('button');
    this.wrapperElement = this.getElement('wrapper');

    this.root.addEventListener('click', this.onButtonClick);
  }

  onButtonClick = () => {
    if (!this.isActive) {
      this.wrapperElement.style.height = `${this.wrapperElement.scrollHeight}px`;
      this.isActive = true;
    } else {
      this.wrapperElement.style.height = '0';
      this.isActive = false;
    }

    this.buttonElement.classList.toggle('spoiler__button--active');
  };
}

export default Spoiler;
