import Component from '../../app/js/base/Component';

class Header extends Component {
    URL;
    views;
    response;
    info;
    loader;

    constructor(element) {
        super(element);
        this.URL = '/stats';
        this.views = this.getElement('views');
        this.response = this.getElement('responses');
        this.loader = this.getElement('loader');
        this.info = this.getElement('info');
        document.addEventListener('DOMContentLoaded', this.getInfo);
    }

    getInfo = () => {
        this.startLoader()

        fetch(this.URL)
            .then(response => response.json())
            .then((data) => {
                return new Promise(res => setTimeout(() => res(data), 5000))
            })
            .then((info)=>{
                this.views.textContent = info.views
                this.response.textContent = info.responses
            })
            .finally(() => {
                this.stopLoader()
            });
    }

    startLoader(){
        this.loader.classList.add('active')
    }

    stopLoader(){
        this.loader.classList.remove('active')
    }
}

export default Header