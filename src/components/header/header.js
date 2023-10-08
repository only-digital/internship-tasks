import Component from '../../app/js/base/Component';

class Header extends Component {
    viewsNumber;
    responseNumber;
    headerLoader;

    constructor(element) {
        super(element);

        this.viewsNumber = this.getElement("views-num");
        this.responseNumber = this.getElement("response-num");
        this.headerLoader = this.getElement("loader");

        this.connectLoader(true);
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
            .finally(()=> {
                this.connectLoader(false);
            })
    };

    renderHeaderInfo = (numbers) => {
        this.viewsNumber.textContent = numbers.views;
        this.responseNumber.textContent = numbers.responses;
    }

    connectLoader(meaning) {
        if(meaning) 
            this.headerLoader.classList.add("active") 
        else 
            this.headerLoader.classList.remove("active")
    }
}

export default Header