import Component from '../../app/js/base/Component'
import { Api } from '../../app/js/utils/api'
import { formatDate } from '../../app/js/utils/formatDate'

class VacancyHeader extends Component {
  dateElement
  viewsElement
  responsesElement

  constructor(element) {
    super(element)

    this.dateElement = this.getElement('date')
    this.viewsElement = this.getElement('views')
    this.responsesElement = this.getElement('reacts')
    this.dateElement.textContent = formatDate(new Date())

    const api = new Api()
    const views = this.viewsElement.textContent
    const responses = this.responsesElement.textContent

    api.getVacancyInfo()
    .then(res => {
      this.viewsElement.textContent = views.concat(` ${res.views}`)
      this.responsesElement.textContent = responses.concat(` ${res.responses}`)
    })
  }
}

export default VacancyHeader
