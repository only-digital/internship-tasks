import Component from '../../app/js/base/Component';

class Form extends Component {

    viewsElement;
    responsesElement;
    formElement;
    buttonElement;
    errorElement;
    successElement;
    constructor(element) {
        super(element);
        this.formElement = document.querySelector('.form-feedback__form');
        this.errorElement = document.querySelector('.form-feedback__error');
        this.successElement = document.querySelector('.form-feedback__success');
        this.buttonElement = document.querySelector('.form-feedback__submit');
        this.viewsElement = document.querySelector('.form-caption__info__views');
        this.responsesElement = document.querySelector('.form-caption__info__responses');


fetch('/stats') 
.then(response => response.json()) 
.then(data => {
  this.viewsElement.textContent += data.views; 
  this.responsesElement.textContent += data.responses; 
})
.catch(error => console.error(error)); 
console.log(this.buttonElement);
this.formElement.addEventListener('submit', (event) => { 
    console.log(event);

event.preventDefault(); 
 
 const email = this.formElement.elements.email.value;
 const confirm = this.formElement.elements.checkbox.checked;
 const data = {email, confirm};
fetch('/form', { 
  method: 'POST',
  headers: {
    'Content-Type': 'application/json' 
  },
  body: JSON.stringify(data) 
})
  .then(response => {
    console.log(response)
    if (response.status === 200) { 
        this.buttonElement.style.display = 'none';
        this.successElement.style.display = 'flex'; 
    } else if (response.status === 422) { 
        this.errorElement.style.display = 'block'; 
    }
  })
  .catch(error => console.error(error)); 
});
// Your code here
    }


}

export default Form