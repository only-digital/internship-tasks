import Component from '../../app/js/base/Component';

class Header extends Component {
    viewers;
    response;

    constructor(element) {
        super(element);
        this.viewers = this.getElement("viewers");
        this.response = this.getElement("response");
        this.getData();
    }
    getData = async () => {
        // this.toggleLoader();
        await fetch('/stats')
            .then(res => res.json())
            .then(data => {
                this.response.innerText = "откликов:" + data.responses;
                this.viewers.innerText = "просмотров:" + data.views;
            })
        // this.toggleLoader();
    }
}

export default Header