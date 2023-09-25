import Component from '../../app/js/base/Component';

class HeaderComponent extends Component {
    URL;
    responses;
    views;
    viewsContent;
    responsesEl;
    responsesContent;
    viewsEl;
    statEl;
    loaderEl;
    constructor(element) {
        super(element);
        this.URL = '/stats';
        this.viewsEl = this.getElement('statistic-views');
        this.viewsContent = this.viewsEl.firstElementChild;
        this.responsesEl = this.getElement('statistic-responses');
        this.responsesContent = this.responsesEl.firstElementChild;
        this.statEl = this.getElement('statistic');
        this.loaderEl = this.getElement('loader');
        document.addEventListener('DOMContentLoaded', this.getData);
    }

    getData = () => {
        fetch(this.URL)
            .then(response => response.json())
            .then((data) => {
                this.responsesContent.innerText = data.responses;
                this.viewsContent.innerText = data.views;
                setTimeout(() => {
                    this.statEl.classList.add('show');
                    this.loaderEl.classList.add('loading');
                },5000)
            });
    }
}

export default HeaderComponent