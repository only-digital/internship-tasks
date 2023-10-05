import Component from '../../app/js/base/Component';

class SpoilerItem extends Component {
  constructor(element) {
    super(element);
    this.root.addEventListener('click', this.toggleSpoiler.bind(this));
  }

  toggleSpoiler() {
    this.root.classList.toggle('spoiler-item__active');
  }
}

export default SpoilerItem;
