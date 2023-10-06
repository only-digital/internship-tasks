import Component from '../../app/js/base/Component';

class Spoiler extends Component {
  content;

  constructor(element) {
    super(element);

    this.content = this.getElement('content');
    this.root.addEventListener('click', this.onTitleClick);
  }

  onTitleClick = () => {
    this.root.classList.toggle('active');

    if (this.root.classList.contains('active')) {
      this.content.style.maxHeight = this.content.scrollHeight + 'px';
    } else {
      this.content.style.maxHeight = 0;
    }
  };
}

export default Spoiler;
