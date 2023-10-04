import Component from '../../app/js/base/component'

class FeedbackForm extends Component {
  constructor(element) {
    super(element)

    this.emailInputElement = this.getElement('content__email__input')
    this.checkboxInputElement = this.getElement('content__checkbox__input')
    this.messageElement = this.getElement('content__message')
    this.loaderElement = this.getElement('content__loader')
    this.submitElement = this.getElement('content__submit')
    this.emailElement = this.getElement('content__email')
    this.confirmElement = this.getElement('content__confirm')
    this.root.addEventListener('submit', this.onSubmit)
  }

  onSubmit = async (event) => {
    event.preventDefault()
    const url = 'http://localhost:3000/form'
    let data = {
      email: this.emailInputElement.value,
      confirm: this.checkboxInputElement.checked,
    }
    this.toggleLoader()
    try {
      let response = await this.sendData(url, data)
      this.handleResponse(response)
    } catch (error) {
      console.error(error)
    } finally {
      this.toggleLoader()
    }
  }

  async sendData(url, data) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
      })
      return await response
    } catch (error) {
      console.error(error)
    }
  }

  async handleResponse(response) {
    let message = await response.json()
    if (response.status == 422) {
      this.messageElement.textContent = message.message
    }
    if (response.status == 200) {
      this.messageElement.textContent = ''
      this.submitElement.setAttribute('disabled', 'disabled')
      this.emailInputElement.setAttribute('disabled', 'disabled')
      this.checkboxInputElement.setAttribute('disabled', 'disabled')
      this.emailElement.style.opacity = 0.3
      this.confirmElement.style.opacity = 0.3
    }
  }

  toggleLoader() {
    this.loaderElement.classList.toggle('loader')
  }
}

export default FeedbackForm
