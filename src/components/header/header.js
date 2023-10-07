import Component from '../../app/js/base/Component';

class Header extends Component {
    viewsNumber;
    responseNumber;

    constructor(element) {
        super(element);

        this.viewsNumber = this.getElement("views-num");
        this.responseNumber = this.getElement("response-num");
        this.getData( this.renderHeaderInfo);
    }

    getData = (onSuccess) => {
        fetch("http://localhost:3000/stats", {method: "GET"})
            .then((response) => {
                if (response.status === 200) { 
                    return response.json();
                }
            })
            .then((data) => {
                onSuccess(data);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    renderHeaderInfo = (numbers) => {
        this.viewsNumber.textContent = numbers.views;
        this.responseNumber.textContent = numbers.responses;
    }
}

export default Header