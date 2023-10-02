import Component from '../../app/js/base/Component';

class ExampleButton extends Component {
    textElement;
    count;

    constructor(element) {
        super(element);

        // Поиск элемента с именем element-button__text внутри компонента
        this.textElement = this.getElement('text')

        // Начальное значение
        this.count = 0;

        // Прослушивание события click и добавление обработчика на это событие
        this.root.addEventListener('click', this.onButtonClick)
    }

    // Обработчик события click
    onButtonClick = () => {
        // Увеличиваем количество кликов
        this.count += 1;

        // Получаем внутренний текст из заранее найденного элемента element-button__text
        const text = this.textElement.textContent

        // Заменяем число в тексте на новое с помощью метода replace
        this.textElement.textContent = text.replace(/\d+/g, this.count);
    }   
}

export default ExampleButton