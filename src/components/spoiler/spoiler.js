import Component from '../../app/js/base/Component';

class Spoiler extends Component {
    captionElement;
    descriptionElement;
    svgElement;

    constructor(element) {
        super(element);

        this.captionElement = this.getElement('caption');

        this.svgElement = this.getElement('caption__svg');

        this.descriptionElement = this.getElement('description');

        this.root.addEventListener('click', this.onSpoilerClick);
    }

    onSpoilerClick = () => {
        if (this.descriptionElement.offsetHeight === 0) {
          this.descriptionElement.style.maxHeight = this.descriptionElement.scrollHeight + "px";
          this.descriptionElement.style.marginBottom = window.getComputedStyle (this.captionElement).marginBottom ;
          this.svgElement.style.rotate = '45deg';
        } else{
          this.descriptionElement.style.maxHeight = "0";
          this.descriptionElement.style.marginBottom = "0px";
          this.svgElement.style.rotate = '180deg';
        }

      }
}

export default Spoiler