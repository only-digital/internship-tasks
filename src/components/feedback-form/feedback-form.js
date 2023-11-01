import Component from '../../app/js/base/component';

class FeedbackForm extends Component {
    button;
    confirm;
    confirmLink;
    confirmLabel;
    confirmInput;
    email;
    emailInput;
    emailSpan;
    textfield;
    textfieldInput;
    textfieldSpan;
    files;
    filesInput;
    filesLabel;

    constructor(element) {
        super(element);

        this.confirm = document.querySelector('.confirm');
        this.confirmLink = document.querySelector('.confirm__link');
        this.confirmLabel = document.querySelector('.confirm__label');
        this.confirmInput = document.querySelector('.confirm__input');
        this.email = document.querySelector('.email');
        this.emailInput = document.querySelector('.email__input');
        this.emailSpan = document.querySelector('.email__span');
        this.textfieldInput = document.querySelector('.textfield__input');
        this.textfieldSpan = document.querySelector('.textfield__span');
        this.textfield = document.querySelector('.textfield');
        this.files = document.querySelector('.files');
        this.filesInput = document.querySelector('.files__input');
        this.filesLabel = document.querySelector('.files__label');
        this.button = document.querySelector('button');
        this.state = element.state;
      
        this.root.addEventListener('submit', this.handleSubmit);
        this.root.addEventListener('input', this.handleInput);
    }
    handleInput = () => {
        if (this.email.getAttribute('data-valid') && this.textfield.getAttribute('data-valid') && this.files.getAttribute('data-valid') && this.confirmInput.checked) {
            console.log('all is valid');
            this.button.disabled = false;
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log('submiting!!')
        console.log(e);

        // Collect form data
        this.form = document.getElementById('form');
        console.log(this.form);
        this.formData = new FormData(this.form);
        console.log(this.formData);
        this.formData.set('confirm', true); //changing ''/'on' to true (without :checked form would not be submited)
        
        
        this.formDataAsObject = {};
        for (const [key, value] of this.formData.entries()) {
        this.formDataAsObject[key] = value;
        }
        this.formDataAsObject.files = this.state.files
        console.log(this.formDataAsObject)
        
        // Perform the POST request using fetch()
        fetch(`/form`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(this.formDataAsObject)
            })
        .then(response => {
      // Handle the response here
       console.log(response)
      
        if (response.status === 200 ) {
            //handle success
            this.confirmLink.classList.add('disabled');
            this.confirmLabel.classList.add('disabled');
            this.confirmInput.disabled = true;
            this.emailInput.disabled = true;
            this.textfield.classList.add('disabled');
            this.textfieldInput.disabled = true;
            this.filesLabel.classList.add('disabled');
            this.filesInput.disabled = true;
            this.button.disabled = true;
            
        } else if (response.status === 422 ) {
            //handle decline
        }
        return response.json();
        })
        .then( data => {
        console.log(data.message);
        })
        .catch(error => {
      // Handle errors here
        console.log(error.message)
        });


        
    }
    }


export default FeedbackForm