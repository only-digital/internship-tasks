import Component from '../../app/js/base/component';

class Vacancy extends Component {
    views;
    responses;
    data;

    constructor(element) {
        super(element);
        //grabing DOM elements
        this.date = this.getElement('date');
        this.views = this.getElement('views');
        this.responses = this.getElement('responses');
        console.log(new Date)
        // setting inner content
        this.date.innerText = new Intl.DateTimeFormat('ru', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date());
        this.views.innerText = 'Просмотров:';
        this.responses.innerText = 'Откликов:';
       
        fetch(`/stats`)
            .then(response => this.data = response.json())
            .then(data => {
                console.log(data.responses, data.views)
                this.views.innerText += ' ' + data.views;
                this.responses.innerText += ' ' + data.responses;
                }
            )
            .catch(error => console.log(error))

        // Your code here
    }

    // Your code here
}

export default Vacancy