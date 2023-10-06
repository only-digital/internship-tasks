import ExampleButton from "../../components/example-button/example-button";
import Textarea from "../../components/textarea/textarea";
import Checkbox from "../../components/checkbox/checkbox";
import Button from '../../components/button/button';
import InputEmail from "../../components/input-email/input-email";

/**
 * Объект со всеми компонентами, для которых будет применяться автоматическая инициализация
 * Ключ объекта - Название компонента, которое было указано во время его создания (совпадает с именем файлов)
 * Значение - JS-класс компонента (Импорт добавляется вручную)
 */

const allComponents = {
    'example-button': ExampleButton,
    'textarea': Textarea,
    'checkbox': Checkbox,
    'button': Button,
    'input-email':InputEmail,
}

/**
 * Инициализация всех компонентов на странице
 */
try {
    const existedComponents = Array.from(document.querySelectorAll('[data-component]'));

    const components = existedComponents.map((component) => {
        try {
            return new allComponents[component.dataset.component]({
                name: component.dataset.component,
                component: component,
            });
        } catch (e) {
            console.error(`Ошибка во время инициализации компонента: ${component.dataset.component}\n\n${e}`);
        }
    });
} catch (e) {
    console.error(e);
}