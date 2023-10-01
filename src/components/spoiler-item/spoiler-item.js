import Component from '../../app/js/base/Component';

class Spoileritem extends Component {
    

    constructor(element) {
        super(element);

        this.root.addEventListener('click', this.tabToitem);

    }

    tabToitem = () => {
        
        const text = this.getElement('text');
        const title = this.getElement('name');
        const img = this.getElement('svg');

        if (this.root.classList.contains('closed'))
        {
            text.style.display = 'block';
            this.root.classList.toggle('closed');
            
            title.style.color = '#114C9A';

            img.style.transform = 'rotate(45deg)';

        }

        else {
            text.style.display = 'none';
            this.root.classList.toggle('closed');

            title.style.color = '#012B34';

            img.style.transform = 'rotate(90deg)';
        }
    }
}

export default Spoileritem