import Component from '../../app/js/base/component';

class OnlyForm extends Component {
    
    inputField;
    formButton;
    checkField;
    errorField;
    successfull;
    loader;
    
    constructor(element) {
        super(element);
        const inputBlock = this.getElement('input-block');
        this.inputField = inputBlock.firstElementChild.querySelector('.only-input');
        this.formButton = inputBlock.firstElementChild.querySelector('.only-button');
        this.checkField = inputBlock.firstElementChild.querySelector('.only-checkagreement').firstElementChild;
        this.errorField = inputBlock.firstElementChild.querySelector('.only-error');
        this.loader = document.body.querySelector('.only-loader');
        this.successfull = this.getElement('successfull');

        this.formButton.addEventListener('click',this.postForm);

    }

    postForm = async ()=>{
          
        this.loader.classList.remove('only-loader_hide');
        this.root.parentElement.style.opacity = '80%';
        
        const response = await fetch('/form',{
            method:'POST',
            headers:{
                "Content-Type":'application/json'
            },
            body: JSON.stringify({
                email:this.inputField.lastElementChild.value,
                confirm:this.checkField.checked?true:false
            })
        });

        this.loader.classList.add('only-loader_hide');
        this.root.parentElement.style.opacity = '100%';
        
        if(response.ok){

            const text = await response.json();
            this.successfull.lastElementChild.textContent = text.message;

            this.errorField.classList.add('only-error_hidden');
            this.formButton.classList.add('only-button_hidden');
            this.root.classList.add('only-form_successfull');
            this.inputField.lastElementChild.setAttribute('disabled','');
            this.checkField.setAttribute('disabled','');

        }
        if(response.status==422){

            const text = await response.json();
            this.errorField.firstElementChild.textContent = text.message;

            this.formButton.classList.remove('only-button_hidden');
            this.errorField.classList.remove('only-error_hidden');
            this.root.classList.remove('only-form_successfull');
            this.inputField.lastElementChild.removeAttribute('disabled');
            this.checkField.removeAttribute('disabled');

        }

    }
}

export default OnlyForm