import Component from '../../app/js/base/Component';

let url = 'http://localhost:3000/stats';
let response = await fetch(url);
let data = await response.json();
// console.log(data.views, data.responses)

class Vacancy extends Component {
    viewsElement;
    responsesElement;
    constructor(element) {
        super(element);
        this.viewsElement = this.getElement('views')
        this.responsesElement = this.getElement('responses')

        this.viewsElement.textContent = `${data.views}`
        this.responsesElement.textContent = `${data.responses}`
        // console.log(this.viewsElement)
    }

    
}

// fetch("http://localhost:3000/stats")
//     .then(res => res.json())
//     .then((data) =>  {
//         dataViews = data.views;
//         dataResponses = data.responses
//     });
// 
export default Vacancy