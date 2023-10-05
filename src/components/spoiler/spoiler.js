import Component from '../../app/js/base/component';

class Spoiler extends Component {
    constructor(element) {
        super(element);
    
        // Прослушивание события click и добавление обработчика на это событие
        this.root.addEventListener('click', this.onClick)
    }
    // Обработчик события click
    onClick = () => {
        
    }
}

export default Spoiler