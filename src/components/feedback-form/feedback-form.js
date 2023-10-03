import Component from '../../app/js/base/Component'
import { Api } from '../../app/js/utils/api'

class FeedbackForm extends Component {

  constructor(element) {
    super(element)

    // const form = document.getElementById('form')

    const form = document.forms.form
    const emailInputField = form.elements.email
    const checkboxIsChecked = form.elements.checkbox

    const emailValidationErrorField = form.querySelector('.feedback-form__input-error')
    const submitButton = form.querySelector('.feedback-form__submit-button')
    const formSubmittedElement = form.querySelector('.feedback-form__submitted')
    let formSubmittedMessageElement = form.querySelector('.feedback-form__submitted-message')

    const api = new Api()

    // CHECK VALIDITY FOR E-MAIL INPUT FIELD. IF CASE INVALID DATA SET ERROR MESSAGE AND ADD CLASS FOR VIEW IT
    emailInputField.addEventListener('invalid', function (evt) {
      evt.preventDefault()
      if (!emailInputField.validity.valid) {

        submitButton.disabled = true

        emailInputField.validity.typeMismatch
          ? emailInputField.setCustomValidity('Проверьте корректность ввода e-mail')
          : emailInputField.setCustomValidity('Поле E-mail обязательно')

        emailValidationErrorField.textContent = emailInputField.validationMessage
        emailValidationErrorField.classList.add('feedback-form__input-error_visible')
      }

    })

// HIDE ERROR MESSAGE WHEN USER INPUT SOME DATA TO FIELD
    emailInputField.addEventListener('input', function (evt) {

      emailValidationErrorField.textContent = ''
      emailValidationErrorField.classList.remove('feedback-form__validation-error_visible')
      if (!emailInputField.validity.typeMismatch) {
        submitButton.disabled = false
      }
    })

// SUBMIT FORM
    form.addEventListener('submit', function (evt) {
      evt.preventDefault()

      // if (!emailInputField.validity.valid) {
      //   return
      // }
      submitButton.classList.add('feedback-form__submit-button_hidden')
      form.classList.add('feedback-form_submitted')

      api.postEmail({ email: emailInputField.value, confirm: checkboxIsChecked.checked })
      .then((res) => {
        if (res.ok) {
          formSubmittedElement.classList.add('feedback-form__submitted_ok')
          formSubmittedMessageElement.textContent = 'Форма успешно отправлена'
        } else {
          formSubmittedElement.classList.add('feedback-form__submitted_fail')
          formSubmittedMessageElement.textContent = 'Что-то пошло не так. Возможно, вы забыли отметить чекбокс'
          setTimeout(() => {
            formSubmittedElement.classList.remove('feedback-form__submitted_fail')
            form.classList.remove('feedback-form_submitted')
            submitButton.classList.remove('feedback-form__submit-button_hidden')
          }, 4500)
        }
      })
      .catch((err) => {
        console.log(err.message)
      })

    })

  }

}

export default FeedbackForm
