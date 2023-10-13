import Component from '../../app/js/base/component';

class Vacancy extends Component {
    date;
    views;
    responses;
    data;
    form;
    button;
    formData;
    formDataAsObject;
    email;
    confirm;
    message;
    messageSpan;
    overlay;

    constructor(element) {
        super(element);
        //grabing DOM elements
        this.date = this.getElement('date');
        this.views = this.getElement('views');
        this.responses = this.getElement('responses');
        this.email = this.getElement('email');
        this.confirm = this.getElement('confirm');
        this.button = this.getElement('button');
        this.message = this.getElement('message');
        this.messageSpan = this.getElement('message-span');
        this.overlay = this.getElement('overlay');
        // setting header inner content
        this.date.innerText = new Intl.DateTimeFormat('ru', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date());
        this.views.innerText = 'Просмотров:';
        this.responses.innerText = 'Откликов:';
        
       
        //fetch views and responses
        fetch(`/stats`)
            .then(response => this.data = response.json())
            .then(data => {
                console.log(data.responses, data.views)
                this.views.innerText += ' ' + data.views;
                this.responses.innerText += ' ' + data.responses;
                }
            )
            .catch(error => console.log(error))

        // form submit listener
      
        this.root.addEventListener('submit', (e) => this.onSubmit(e))
    }
   
    // handle Submit
    onSubmit = (e) => {
        console.log('submited');
        e.preventDefault();
        
        // Collect form data
        this.form = this.getElement('form');
        this.formData = new FormData(form);
        this.formData.set('confirm', true); //changing 'on' to true
        console.log(this.formData.get('email'), this.formData.get('confirm') )
        
        // Perform the POST request using fetch()
        this.formDataAsObject = {};
        for (const [key, value] of this.formData.entries()) {
        this.formDataAsObject[key] = value;
        }

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
            this.message.classList.add('success');
            this.button.style.opacity = '0';
            this.button.disabled = true;
            this.overlay.style.display = 'block';
        } else if (response.status === 422 ) {
            this.message.style.color = 'red';
        }
        return response.json();
        })
        .then( data => {
            this.messageSpan.innerText = data.message;
            
        })
        .catch(error => {
      // Handle errors here
        console.log(error)
        });
    }
}

export default Vacancy