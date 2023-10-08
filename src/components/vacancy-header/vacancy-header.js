import Component from '../../app/js/base/component';

class VacancyHeader extends Component {
  URL;
  stats;
  views;
  responses;

  constructor(element) {
    super(element);
    this.URL = '/stats';
    this.stats = this.getElement('stats');
    this.views = this.getElement('views');
    this.responses = this.getElement('responses');
    document.addEventListener('DOMContentLoaded', this.getStats);
  }

  getStats = () => {
    fetch(this.URL)
      .then((response) => response.json())
      .then((stats) => {
        this.views.textContent = stats.views;
        this.responses.textContent = stats.responses;
      });
  };
}

export default VacancyHeader;
