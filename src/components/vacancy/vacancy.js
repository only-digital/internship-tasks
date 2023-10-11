import Component from '../../app/js/base/component';

class Vacancy extends Component {
    views;
    responses;
    data;
    form;

    constructor(element) {
        super(element);
        //grabing DOM elements
        this.date = this.getElement('date');
        this.views = this.getElement('views');
        this.responses = this.getElement('responses');
        this.form = this.getElement('form');
        console.log(new Date)
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
        this.form.addEventListener('submit', (e) => this.onSubmit(e))
    }

    // handle Submit
    onSubmit = (e) => {
        e.preventDefault();
    }
}

export default Vacancy