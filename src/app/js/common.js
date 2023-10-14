import ExampleButton from "../../components/example-button/example-button";
import OnlyButton from "../../components/only-button/only-button";
import OnlyCheckAgreement from "../../components/only-checkagreement/only-checkagreement";
import OnlyError from "../../components/only-error/only-error";
import OnlyForm from "../../components/only-form/only-form";
import OnlyInput from "../../components/only-input/only-input";
import OnlyParag from "../../components/only-parag/only-parag";
import OnlyPoint from "../../components/only-point/only-point";
import OnlyVacancyWrapper from "../../components/only-vacancy-wrapper/only-vacancy-wrapper";
import OnlyLoader from "../../components/only-loader/only-loader";

/**
 * Объект со всеми компонентами, для которых будет применяться автоматическая инициализация
 * Ключ объекта - Название компонента, которое было указано во время его создания (совпадает с именем файлов)
 * Значение - JS-класс компонента (Импорт добавляется вручную)
 */
const allComponents = {
    'example-button': ExampleButton,
    'only-button': OnlyButton,
    'only-checkagreement': OnlyCheckAgreement,
    'only-error': OnlyError,
    'only-form': OnlyForm,
    'only-input': OnlyInput,
    'only-parag': OnlyParag,
    'only-point': OnlyPoint,
    'only-vacancy-wrapper':OnlyVacancyWrapper,
    'only-loader':OnlyLoader
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