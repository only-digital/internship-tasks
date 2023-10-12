import Component from '../../app/js/base/Component';

class VacancyHeader extends Component {
    statsElement;
    headerLoaders;

    constructor(element) {
      super(element);
      this.statsElement = this.getElement("stats");
      this.headerLoaders = this.getElements("header-loader");
  
      this.connectLoader(true);
      document.addEventListener("DOMContentLoaded", this.getData);
    }

    getData = async () => {
        try {
          const res = await fetch("/stats");
          const stats = await res.json();
    
          this.setData(stats);
        } catch (err) {
          console.log('Ошибка:', err);
        } finally {
            this.connectLoader(false);
        }
    };

    setData = (data) => {
        const dataArr = Object.keys(data);
        dataArr.forEach(el => {
          const targetElement = this.statsElement.querySelector(`[data-type="${el}"]`);
          targetElement.textContent = data[el];
        })
    }

    connectLoader(meaning) {
        if(meaning) 
            this.headerLoaders.forEach(el => {
                el.classList.add("active")
            })
        else {
            this.headerLoaders.forEach(el => {
                el.classList.remove("active")
            })
        }
    }
}

export default VacancyHeader