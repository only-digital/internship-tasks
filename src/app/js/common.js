import ExampleButton from "../../components/example-button/example-button";
import FileInput from "../../components/file-input/file-input";
import ContactForm from "../../components/contact-form/contact-form"
import InputField from '../../components/input-field/input-field'
import Textarea from '../../components/textarea/textarea'
import Checkbox from '../../components/checkbox/checkbox'
import RegularButton from '../../components/regular-button/regular-button'

/**
 * Объект со всеми компонентами, для которых будет применяться автоматическая инициализация
 * Ключ объекта - Название компонента, которое было указано во время его создания (совпадает с именем файлов)
 * Значение - JS-класс компонента (Импорт добавляется вручную)
 */
const allComponents = {
    'example-button': ExampleButton,
    'file-input': FileInput,
    'contact-form': ContactForm,
    'input-field': InputField,
    'textarea': Textarea,
    'regular-button': RegularButton,
    'checkbox': Checkbox
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