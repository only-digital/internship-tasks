import Component from '../../app/js/base/Component';

class HeaderBlock extends Component {
    views;
    responses;
    loader;
    stats;

    constructor(element) {
        super(element);
        this.views = this.getElement('stats-views')
        this.responses = this.getElement('stats-responses')
        this.loader = this.getElement('loader')
        this.stats = this.getElement('stats')

        document.addEventListener('DOMContentLoaded', this.getData)
    }

    getData = async () => {
        await fetch('/stats')
            .then(res => res.json())
            .then(data => {
                const {views, responses} = data;
                this.loader.classList.add('hidden');
                this.stats.classList.remove('hidden');
                this.views.textContent = `Просмотров: ${views}`;
                this.responses.textContent = `Откликов: ${responses}`;
            })
            .catch(err => console.log(err))
    }

}

export default HeaderBlock