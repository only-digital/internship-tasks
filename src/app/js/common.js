import ExampleButton from "../../components/example-button/example-button";
import Button from "../../components/button/button";
import Checkbox from "../../components/checkbox/checkbox";
import InputEmail from "../../components/input-email/input-email";
import InputTextarea from "../../components/input-textarea/input-textarea";
import FileButton from "../../components/file-button/file-button";
import Form from "../../components/form/form";

/**
 * Объект со всеми компонентами, для которых будет применяться автоматическая инициализация
 * Ключ объекта - Название компонента, которое было указано во время его создания (совпадает с именем файлов)
 * Значение - JS-класс компонента (Импорт добавляется вручную)
 */
const allComponents = {
    'example-button': ExampleButton,
    'button': Button,
    'checkbox': Checkbox,
    'input-email': InputEmail,
    'input-textarea': InputTextarea,
    'file-button': FileButton,
    'form': Form,
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