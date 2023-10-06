const validateForm = () => {
    const feedBackForm = document.querySelector('.feedback-form__controls')
    const submitButton = document.querySelector('.submit-button');
    const emailFieldError = document.querySelector('.email-input__error-field');
    const messageFieldError = document.querySelector('.text-area__error-field');
    const attachedFilesError = document.querySelector('.attach-button__error-field');
    const checkbox = document.getElementById('agreement-check');

    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    if (messageFieldError.textContent.length === 0 
        && messageInput.value.length
        && emailFieldError.textContent.length === 0 
        && emailInput.value.length
        && attachedFilesError.textContent.length === 0
        && checkbox.checked) {
            submitButton.classList.remove('disabled');
            feedBackForm.classList.remove('invalid');
    } else {
        submitButton.classList.add('disabled');
        feedBackForm.classList.add('invalid');
    }
}

export default validateForm;