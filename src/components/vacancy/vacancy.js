import Component from '../../app/js/base/Component';

class Vacancy extends Component {
  constructor(element) {
    super(element);
    this.qtyViews = this.getElement('qty-views');
    this.qtyResponses = this.getElement('qty-responses');
    this.loader = this.getElement('loader');
    fetch('/stats', { method: 'GET' })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка ${res.status}`);
        }
      })
      .then((data) => {
        this.qtyResponses.textContent = `Откликов : ${data.responses}`;
        this.qtyViews.textContent = `Просмотров : ${data.views}`;
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this.loader.classList.add('vacancy__loader_invisible');
      });
  }
}

export default Vacancy;
