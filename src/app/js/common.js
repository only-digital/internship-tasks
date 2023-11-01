import ExampleButton from "../../components/example-button/example-button";
import OnlyAgreement from "../../components/only-agreement/only-agreement";
import OnlyFileInput from "../../components/only-file-input/only-file-input";
import OnlyForm from "../../components/only-form/only-form";
import OnlyInput from "../../components/only-input/only-input";
import OnlyTextArea from "../../components/only-text-area/only-text-area";
import OnlyBtn from "../../components/only-btn/only-btn";

/**
 * Объект со всеми компонентами, для которых будет применяться автоматическая инициализация
 * Ключ объекта - Название компонента, которое было указано во время его создания (совпадает с именем файлов)
 * Значение - JS-класс компонента (Импорт добавляется вручную)
 */
const allComponents = {
    'example-button': ExampleButton,
    'only-agreement':OnlyAgreement,
    'only-file-input':OnlyFileInput,
    'only-form':OnlyForm,
    'only-input':OnlyInput,
    'only-text-area':OnlyTextArea,
    'only-btn':OnlyBtn
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