import Component from '../../app/js/base/component'

class JobVacancy extends Component {
  constructor(element) {
    super(element)
    this.viewsElement = this.getElement('title__additional-information__views')
    this.responseElement = this.getElement(
      'title__additional-information__response'
    )
    this.onload()
  }

  onload = async () => {
    const url = 'http://localhost:3000/stats'
    try {
      let response = await fetch(url)
      let data = await response.json()
      this.viewsElement.classList.remove('loader')
      this.responseElement.classList.remove('loader')
      this.viewsElement.textContent = data.views
      this.responseElement.textContent = data.responses
    } catch (error) {
      console.error(error)
    }
  }
}

export default JobVacancy
