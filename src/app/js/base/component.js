/**
 * @description Базовый класс для работы с компонентами
 */
class Component {
    root;
    rootName;

    constructor({name, component}) {
        this.root = component;
        this.rootName = name;

        this.destroy = this.destroy.bind(this);
    }

    getElement = (name) => {
        return this.root.querySelector(`.${this.rootName}__${name}`) ?? undefined;
    };

    getElements = (name) => {
        return Array.from(this.root.querySelectorAll(`.${this.rootName}__${name}`));
    };

    destroy() {

    }
}

export default Component;