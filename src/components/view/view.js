import Component from '../../app/js/base/Component';

class View extends Component {
    views;
    responses;
    constructor(element) {
        super(element);

        this.views = this.getElement('views');
        this.responses = this.getElement('responses');
        this.getData();
    }

    getData = async () => {
        const url = 'http://localhost:3000/stats';
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                if (data.views && data.responses) {
                    this.views.textContent = this.views.textContent +' '+ data.views;
                    this.responses.textContent = this.responses.textContent + ' ' + data.responses;
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export default View