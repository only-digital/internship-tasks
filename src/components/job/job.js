import Component from '../../app/js/base/Component';

class Job extends Component {

    constructor(element) {
        super(element);

        const views = this.getElement('views');
        const responses = this.getElement('responses');

        fetch('/stats')
            .then(response => response.json())
            .then(data => {
                views.textContent += data.views;
                responses.textContent += data.responses;
            });
    }
}

export default Job
