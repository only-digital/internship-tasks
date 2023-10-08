import Component from '../../app/js/base/component';

class Vacancy extends Component {
    views;
    responses;

    constructor(element) {
        super(element);
        //grabing DOM elements
        this.date = this.getElement('date');
        this.views = this.getElement('views');
        this.responses = this.getElement('responses');
        console.log(new Date)
        // setting inner content
        this.date.innerText = new Intl.DateTimeFormat('ru', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date());
        this.views.innerText = 'Просмотров: 123';
        this.responses.innerText = 'Откликов: 12';
       

        // Your code here
    }

    // Your code here
}

export default Vacancy