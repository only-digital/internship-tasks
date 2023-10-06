import Component from '../../app/js/base/Component';

class AccordionExample extends Component {
  constructor(element) {
    super(element);
    this.button = this.getElement('button');
    this.textElement = this.getElement('text');
    this.buttonIcon = this.getElement('button-icon');
    this.button.addEventListener('click', this.toggleAccordion);
    console.log(this.button, this.textElement);
  }

  toggleAccordion = () => {
    console.log('button clicked');
    this.textElement.classList.toggle('accordion-example__text_visible');
    this.buttonIcon.classList.toggle(
      'accordion-example__button-icon_transform_rotated'
    );
    this.button.classList.toggle('accordion-example__button_active');
  };
}

export default AccordionExample;
