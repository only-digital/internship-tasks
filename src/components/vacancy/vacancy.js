import Component from '../../app/js/base/component';

class Vacancy extends Component {
    views;
    responses;
    data;
    form;
    formData;
    formDataAsObject;
    email;
    confirm;

    constructor(element) {
        super(element);
        //grabing DOM elements
        this.date = this.getElement('date');
        this.views = this.getElement('views');
        this.responses = this.getElement('responses');
        this.email = this.getElement('email');
        this.confirm = this.getElement('confirm');
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

        // form input handler
        
        this.root.addEventListener('submit', (e) => this.onSubmit(e))
    }

    // handle Submit
    onSubmit = (e) => {
        console.log(e.target);
        console.log(email.value);
        console.log(confirm.value);
        e.preventDefault();
        // Collect form data
        this.form = this.getElement('form');
        //console.log(this.form)
        this.formData = new FormData(form);
        this.formData.set('confirm', true)
        console.log(this.formData.get('email'), this.formData.get('confirm') )
        //console.log('myformData:', this.formData.entries);
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
        console.log(response.json())
        })
        .catch(error => {
      // Handle errors here
        console.log(error)
        });
    }
}

export default Vacancy