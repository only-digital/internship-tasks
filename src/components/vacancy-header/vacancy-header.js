import Component from '../../app/js/base/component';

const URL = '/stats';

class VacancyHeader extends Component {
  stats;
  views;
  responses;

  constructor(element) {
    super(element);
    this.views = this.getElement('views');
    this.responses = this.getElement('responses');
    this.loader = this.getElement('loader');

    document.addEventListener('DOMContentLoaded', this.getStats);
  }

  getStats = () => {
    this.loader.classList.add('loader-visible');
    fetch(URL)
      .then((response) => response.json())
      .then((stats) => {
        this.views.textContent = 'Просмотров: ' + stats.views;
        this.responses.textContent = 'Откликов: ' + stats.responses;
        this.loader.classList.remove('loader-visible');
      })
      .catch((error) => {
        this.loader.classList.remove('loader-visible');
        this.views.textContent = 'Сервер временно недоступен.';
        this.views.style = 'color: red';
      });
  };
}

export default VacancyHeader;
