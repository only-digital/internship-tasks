import Component from '../../app/js/base/Component'
import { mockVacancy } from '../../app/js/utils/mockVacancy'

class Section extends Component {
  constructor(element) {
    super(element)

    const responsibilitiesListElement = document.querySelector('.section__list_responsibilities')
    const requirementsListElement = document.querySelector('.section__list_requirements')
    const conditionsListElement = document.querySelector('.section__list_conditions')

    function renderChapter(listElement, listItem) {
      const listItemElement = document.createElement('li')
      listItemElement.classList.add('section__list-item')
      listItemElement.textContent = listItem
      listElement.appendChild(listItemElement)
    }

    mockVacancy.responsibilities.forEach((item) => {
      renderChapter(responsibilitiesListElement, item)
    })

    mockVacancy.requirements.forEach(item => {
      renderChapter(requirementsListElement, item)
    })

    mockVacancy.conditions.forEach(item => {
      renderChapter(conditionsListElement, item)
    })
  }
}

export default Section
