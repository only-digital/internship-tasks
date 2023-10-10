import Component from '../../app/js/base/Component';

class Header extends Component {
    viewers;
    response;
    loader;

    constructor(element) {
        super(element);
        this.viewers = this.getElement("viewers");
        this.response = this.getElement("response");
        this.loader = this.getElement("loader");

        this.getData();
    }

    getData = async () => {
        await fetch('/stats')
            .then(res => res.json())
            .then(data => {
                this.response.innerText = "откликов:" + data.responses;
                this.viewers.innerText = "просмотров:" + data.views;
            })
        this.loader.classList.remove("loader_active");
    }
}

export default Header