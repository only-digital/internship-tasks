import Component from '../../app/js/base/component';

class VacancyPage extends Component {
  statistic;

  constructor(element) {
    super(element);
    this.statistic = this.getElement('stat');
    setTimeout(() => {
      if (JSON.parse(localStorage.getItem('statData'))) {
                  this.statistic.firstChild.textContent =`Посмотров: ${JSON.parse(localStorage.getItem('statData')).views}` ,
                  this.statistic.lastChild.textContent = `Откликов: ${JSON.parse(localStorage.getItem('statData')).responses}`
      }else{ console.log('localStorage-null') }}, "5050");
    }
}
export default VacancyPage