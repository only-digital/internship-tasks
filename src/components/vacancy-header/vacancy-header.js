import Component from '../../app/js/base/component';

class VacancyHeader extends Component {
    stats;
    views;
    responses;

    constructor(element) {
        super(element);

        this.views = this.root.querySelector('#views')
        this.responses = this.root.querySelector('#responses')

        this.onPageLoad()
            .then((res) => this.stats = res)
            .then(() => this.setStats())

    }

    onPageLoad = async () => {
        const res = await fetch('/stats');
        return await res.json();
    }
    
    setStats = () => {
        this.views.classList.remove('vacancy-header__stats-count_load');
        this.responses.classList.remove('vacancy-header__stats-count_load');

        this.views.textContent = this.stats.views;
        this.responses.textContent = this.stats.responses;
    }
}

export default VacancyHeader