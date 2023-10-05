import Component from '../../app/js/base/component';

class Spoiler extends Component {
    constructor(element) {
        super(element);
    
        // Прослушивание события click и добавление обработчика на это событие
        this.root.addEventListener('click', this.onClick)
    }
    // Обработчик события click
    onClick = () => {
        console.log(this.root);
        if (this.root.classList.contains('spoiler_opened')) {
            this.root.classList.replace('spoiler_opened', 'spoiler_closed');
        } else {
            this.root.classList.replace('spoiler_closed', 'spoiler_opened');
        }
    }
}

export default Spoiler