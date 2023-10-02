import DateNow from "../../components/date-now/date-now";
import MainTitle from "../../components/main-title/main-title";
import Statistic from "../../components/statistic/statistic";
import Title from "../../components/title/title";
import Clause from "../../components/clause/clause";
import Form from "../../components/form/form";
import ContainerForm from "../../components/container-form/container-form";
import Button from "../../components/button/button";

/**
 * Объект со всеми компонентами, для которых будет применяться автоматическая инициализация
 * Ключ объекта - Название компонента, которое было указано во время его создания (совпадает с именем файлов)
 * Значение - JS-класс компонента (Импорт добавляется вручную)
 */
const allComponents = {
    'date-now': DateNow,
    'main-title': MainTitle,
    'statistic': Statistic,
    'title': Title,
    'clause': Clause,
    'form': Form,
    'container-form': ContainerForm,
    'button': Button,

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