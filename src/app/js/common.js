import ExampleButton from "../../components/example-button/example-button";
import Button from '../../components/button/button';
import FeedbackForm from '../../components/feedback-form/feedback-form';
import Email from '../../components/email/email';
import Confirm from '../../components/confirm/confirm';
import Textfield from '../../components/textfield/textfield';
import Files from '../../components/files/files';
import State from './base/state';

/**
 * Объект со всеми компонентами, для которых будет применяться автоматическая инициализация
 * Ключ объекта - Название компонента, которое было указано во время его создания (совпадает с именем файлов)
 * Значение - JS-класс компонента (Импорт добавляется вручную)
 */
const allComponents = {
    'example-button': ExampleButton,
    'button': Button,
    'feedback-form': FeedbackForm,
    'email': Email,
    'confirm': Confirm,
    'textfield': Textfield,
    'files': Files,
}
const state = new State();

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
                state: state,
            });
        } catch (e) {
            console.error(`Ошибка во время инициализации компонента: ${component.dataset.component}\n\n${e}`);
        }
    });
} catch (e) {
    console.error(e);
}