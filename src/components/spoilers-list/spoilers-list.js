import Component from '../../app/js/base/Component'
import { mockData } from '../../app/js/utils/mock-data'
import Spoiler from '../spoiler/spoiler'

class SpoilersList extends Component {
  constructor(element) {
    super(element)

    this.generateSpoilers()
  }

  generateSpoilers() {
    const spoilersContainer = document.querySelector('.spoilers-list')
    mockData.forEach(item => {
      const spoiler = new Spoiler(item)
      const spoilerElement = spoiler.generateSpoiler()
      spoilersContainer.appendChild(spoilerElement)
    })
  }
}

export default SpoilersList
