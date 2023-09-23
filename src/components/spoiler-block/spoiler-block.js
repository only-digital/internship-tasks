import Component from '../../app/js/base/Component'

class SpoilerBlock extends Component {
  constructor(element) {
    super(element)

    this.titleElement = this.getElement('item__title')

    this.root.addEventListener('click', this.onClick)
  }

  onClick = (event) => {
    let spoilerItem = event.target.closest('.spoiler-block__item')
    let spoilerButton = event.target.closest('button')

    if (!spoilerButton) {
      return
    }

    spoilerItem.classList.toggle('active')

    let spoilerConten = spoilerButton.nextElementSibling

    if (spoilerConten.style.maxHeight) {
      spoilerConten.style.maxHeight = null
    } else {
      spoilerConten.style.maxHeight = spoilerConten.scrollHeight + 'px'
    }
  }
}

export default SpoilerBlock
