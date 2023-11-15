import Component from '../../app/js/base/Component';

class Header extends Component {
    headerInfoContent;
    headerInfoLoader;

    constructor(element) {
        super(element);

        this.headerInfoContent = element.component.querySelector('.header__info');
        this.headerInfoLoader = element.component.querySelector('.loader');

        window.addEventListener('load', this.getHeaderInfo);
    }

    getHeaderInfo = () => {
        this.headerInfoLoader.classList.remove('hidden');
        fetch('http://localhost:3000/stats', {
            method: 'GET'
        })
            .then((response) => {
                if(!response.ok) {
                    throw new Error('Error occurred')
                }
                return response.json();
            })
            .then((data) => {
                this.renderHeaderInfo(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    renderHeaderInfo = (data) =>{
        for(const key in data) {
            this.createTextInfo(data, key)
        }
        this.headerInfoLoader.classList.add('hidden');
    }
    createTextInfo = (data, key) =>{
        const p = document.createElement('p');
        p.classList.add('header__info-text');
        p.textContent = key === 'views' ? 'Просмотров: ' : 'Откликов: ';
        p.textContent += data[key];
        this.headerInfoContent.append(p);
    }
}

export default Header
