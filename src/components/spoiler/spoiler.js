import Component from '../../app/js/base/Component'

class Spoiler extends Component {
  constructor(element) {
    super(element)

    this._title = element.title
    this._subtitle = element.description
    this._id = element.id
  }

  _getTemplate() {
    return document
    .querySelector('#spoiler')
    .content.querySelector('.spoiler')
    .cloneNode(true)
  }

 generateSpoiler() {
    this._element = this._getTemplate()
    this._element.querySelector('.spoiler__title').textContent = this._title
    this._element.querySelector('.spoiler__subtitle').textContent = this._subtitle
    this._element.setAttribute('key', this._id)
    this._setEventListener()
    return this._element
  }

  _toggleSpoiler() {
    this._element.classList.toggle('spoiler_open')
    console.log(this._element)
  }

  _setEventListener() {
    this._button = this._element.querySelector('.spoiler__button')
    this._button.addEventListener('click', () => this._toggleSpoiler())
  }
}

export default Spoiler
