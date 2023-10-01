import Component from '../../app/js/base/Component';

class Spoileritem extends Component {
    

    constructor(element) {
        super(element);

        this.root.addEventListener('click', this.tabToitem);

        /**При разной ширине экрана - разные отступы. В случае, если 
         вопрос был "открыт", а ширина экрана изменилась - необходимо изменить
         размер отступа */
        window.onresize = this.calcMargin;
    }

    calcMargin = () => {
        
        const text = this.getElement('text');

        if (window.screen.width <= 768) {
            text.style.marginBottom = null;
            text.style.marginTop = '16px';
        }

        else if (window.screen.width <= 1280) {
            text.style.marginBottom = '4px';
            text.style.marginTop = '16px';
        }

        else if (window.screen.width <= 1440) {
            text.style.marginBottom = '6px';
            text.style.marginTop = '20px';
        }

        else {
            text.style.marginBottom = '10px';
            text.style.marginTop = '30px';
        }
    }

    tabToitem = () => {
        
        const text = this.getElement('text');
        const title = this.getElement('name');
        const img = this.getElement('svg');

        if (this.root.classList.contains('closed'))
        {
            text.style.maxHeight = text.scrollHeight + 'px';
            
            this.calcMargin();

            this.root.classList.toggle('closed');
            
            title.style.color = '#114C9A';

            img.style.transform = 'rotate(45deg)';

        }

        else {

            text.style.maxHeight = 0;
            text.style.marginBottom = null;
            text.style.marginTop = null;

            this.root.classList.toggle('closed');

            title.style.color = '#012B34';

            img.style.transform = 'rotate(90deg)';
        }
    }
}

export default Spoileritem