import Component from '../../app/js/base/Component';

class Spoiler extends Component {
    constructor(element) {
        super(element);

        // Находим все кнопки и присваиваем их в переменную

        const buttons = this.getElements("button")

        // Навешиваем обработчики события клика на кнопки

        buttons.forEach(button => {
            button.addEventListener("click", this.onButtonClick)
        })
    }

    // Обработчик события нажатия на кнопку в спойлере

    onButtonClick = () => {
        this.root.classList.toggle("open")
        if (this.root.classList.contains("open")) {
            this.getElement("text").style.maxHeight = this.getElement("text").scrollHeight + "px"
        } else {
            this.getElement("text").style.maxHeight = 0
        }
    }
}

export default Spoiler