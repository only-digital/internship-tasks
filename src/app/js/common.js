import ExampleButton from "../../components/example-button/example-button";
import Form from "../../components/form/form";
import Btn from "../../components/btn/btn";
import Checkbox from "../../components/checkbox/checkbox";
import File from "../../components/file/file";
import InputField from "../../components/input-field/input-field";
import Textarea from "../../components/textarea/textarea";

/**
 * Объект со всеми компонентами, для которых будет применяться автоматическая инициализация
 * Ключ объекта - Название компонента, которое было указано во время его создания (совпадает с именем файлов)
 * Значение - JS-класс компонента (Импорт добавляется вручную)
 */
const allComponents = {
    'example-button': ExampleButton,
    'form': Form,
    'btn': Btn,
    'checkbox': Checkbox,
    'file': File,
    'input-field': InputField,
    'textarea': Textarea,
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