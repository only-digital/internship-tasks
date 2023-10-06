import Component from '../../app/js/base/Component';

class Spoiler extends Component {
    buttonElement;
    textElement;
  
    constructor(element) {
      super(element);
      this.buttonElement = this.getElement('button');
      this.textElement = this.getElement('text');
  
      this.buttonElement.addEventListener('click', this.onButtonClick);
    }
  
    onButtonClick = () => {
      this.root.classList.toggle('open')
  
      if (this.root.classList.contains('open')) {
        this.textElement.style.height = this.textElement.scrollHeight + 'px';
      } else {
        this.textElement.style.height = 0;
      }
    }
}

export default Spoiler