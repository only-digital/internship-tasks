import Component from '../../app/js/base/Component';

class Form extends Component {
    constructor(element) {
        super(element);
    }
}

const form = document.querySelector('.form__form');
const loader = document.querySelector('.form__loader')
const errorEl = document.querySelector('.form__error');
const successEl = document.querySelector('.form__success');
const formButton = document.querySelector('button')

form.addEventListener('input', checkValidity);
form.addEventListener('submit', handeFormSubmit);

async function handeFormSubmit(event) {
    event.preventDefault()

    const data = serializeForm(form);
    toggleLoader()
    const response = await sendData(data);
    toggleLoader()
    let result = await response.json();
    let message = result.message;
    if(response.status == 200) {
        onSuccess(message)
        errorEl.classList.add('hidden');
        errorEl.textContent = '';
        document.querySelector('.form__main').classList.add('confirmed')
    } else {
        onError(message)
        successEl.classList.add('hidden');
        successEl.textContent = '';
    }
}

function serializeForm(formNode) {
    const formData = new FormData(formNode);
 
    const data = {
        email: formData.get('email'),
        confirm: formData.get('confirm') === 'on' ? true : false
    }
    return data

}
async function sendData(data) {
    return await fetch('http://localhost:3000/form', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
}

function toggleLoader() {
    loader.classList.toggle('hidden')
}

function onSuccess(message) {
    successEl.textContent = message;
    successEl.classList.remove('hidden')  
}

function onError(message) {
    errorEl.textContent = message;
    errorEl.classList.remove('hidden')
}

function checkValidity(event) {
    const formNode = event.target.form
    const isValid = formNode.checkValidity()

    formButton.disabled = !isValid;
}
export default Form