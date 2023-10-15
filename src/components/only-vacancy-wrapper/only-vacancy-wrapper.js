import Component from '../../app/js/base/component';

class OnlyVacancyWrapper extends Component {
    dateElement;
    viewsElement;
    referencesElement;
    loader;

    mounth = new Map([
        ['1','Января'],
        ['2','Февраля'],
        ['3','Марта'],
        ['4','Апреля'],
        ['5','Мая'],
        ['6','Июня'],
        ['7','Июля'],
        ['8','Августа'],
        ['9','Сентября'],
        ['10','Октября'],
        ['11','Ноября'],
        ['12','Декабря']
    ]);

    constructor(element) {
        super(element);

        this.dateElement = this.getElement('date');
        this.viewsElement = this.getElement('views');
        this.referencesElement = this.getElement('references');
       
        this.getDate();
        this.loader = document.body.querySelector('.only-loader');
        this.loader.classList.remove('only-loader_hide');
        this.root.style.opacity='80%';
  
        fetch('/stats')
            .catch(e=>console.log(e))
            .then(res=>res.json())
            .then(data=>{
                this.viewsElement.textContent += data.views;
                this.referencesElement.textContent += data.responses;
                this.loader.classList.add('only-loader_hide');
                this.root.style.opacity='100%';
            });

        
        setInterval(()=>this.getDate(),10000);
    }

    getDate = ()=>{

        const date = new Date()
        .toLocaleDateString()
        .split('.');
    
        date[1]=this.mounth.get(date[1]);

        const formatedDate = date.join(' ');

        if(this.dateElement.textContent!==date){

            this.dateElement.textContent = formatedDate;

        }
        
    }

}

export default OnlyVacancyWrapper