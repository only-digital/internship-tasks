/**
 * @description Базовый класс для работы с компонентами
 */
class Component {
    /** Корневой элемент компонента */
    root;
    /** Имя корневого элемента */
    rootName;

    constructor({name, component}) {
        this.root = component;
        this.rootName = name;

        this.destroy = this.destroy.bind(this);
    }

    /**
     * @description Поиск внутреннего элемента компонента в соответствии с правилами наименования элементов
     * @param name - имя класса элемента после символов "__"
     * @return HTMLElement
     * @example
     * this.getElement('button');
     */
    getElement = (name) => {
        return this.root.querySelector(`.${this.rootName}__${name}`) ?? undefined;
    };

    /**
     * @description Поиск внутренних элементов компонента в соответствии с правилами наименования элементов
     * @param name - имя класса элемента после символов "__"
     * @return HTMLElement[] - массив элементов с соответствующим классом, найденных внутри компонента
     * @example
     * this.getElements('button');
     */
    getElements = (name) => {
        return Array.from(this.root.querySelectorAll(`.${this.rootName}__${name}`));
    };

    destroy() {

    }
}

export default Component;