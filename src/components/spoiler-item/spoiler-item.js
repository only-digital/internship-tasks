import Component from '../../app/js/base/Component'

class SpoilerItem extends Component {
  constructor(element) {
    super(element)
    this.titleElement = this.getElement('item__title')
    this.root.addEventListener('click', this.onClick)
  }

  onClick = (event) => {
    let spoilerItem = event.target.closest('.spoiler-item')
    let spoilerContent = spoilerItem.querySelector('.spoiler-item__content')
    spoilerItem.classList.toggle('active')

    if (spoilerContent.style.maxHeight) {
      spoilerContent.style.maxHeight = null
    } else {
      spoilerContent.style.maxHeight = spoilerContent.scrollHeight + 'px'
    }
  }
}

export default SpoilerItem
