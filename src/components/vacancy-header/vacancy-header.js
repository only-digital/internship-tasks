import Component from '../../app/js/base/component';

const URL = '/stats';

class VacancyHeader extends Component {
  stats;
  views;
  responses;

  constructor(element) {
    super(element);
    this.URL = '/stats';
    this.stats = this.getElement('stats');
    this.views = this.getElement('views');
    this.responses = this.getElement('responses');
    this.loader = this.getElements('loader');

    document.addEventListener('DOMContentLoaded', this.getStats);
  }

  getStats = () => {
    this.loader.forEach((loader) => {
      loader.classList.add('loader-visible');
    });
    fetch(URL)
      .then((response) => response.json())
      .then((stats) => {
        this.views.textContent = stats.views;
        this.responses.textContent = stats.responses;
        this.loader.forEach((loader) => {
          loader.classList.remove('loader-visible');
        });
      });
  };
}

export default VacancyHeader;
