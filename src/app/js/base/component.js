/**
 * @description Базовый класс для работы с компонентами
 */
class Component {
    root;
    rootName;
    loader;

    constructor({ name, component }) {
        this.root = component;
        this.rootName = name;
        this.loader = document.querySelector(`.loader`);

        this.destroy = this.destroy.bind(this);
    }


    getElement = (name) => {
        return this.root.querySelector(`.${this.rootName}__${name}`) ?? undefined;
    };


    getElements = (name) => {
        return Array.from(this.root.querySelectorAll(`.${this.rootName}__${name}`));
    };

    toggleLoader = () => {
        this.loader.classList.toggle("loader_active");
    }

    destroy() {

    }
}

export default Component;
