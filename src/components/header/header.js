import Component from '../../app/js/base/Component';

class Header extends Component {
    URL;
    views;
    responses;

    constructor(element) {
        super(element);

        this.URL = '/stats'
        this.views = document.querySelector('.header__info-views');
        this.responses = document.querySelector('.header__info-resp');
        
        document.addEventListener('DOMContentLoaded', this.getStats);      
    }

    getStats = () => {
        fetch(this.URL)
            .then(response => response.json())
            .then(data => {
                this.views.textContent = data.views;
                this.responses.textContent = data.responses;
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });
    }
    
}

export default Header