import ExampleButton from "../../components/example-button/example-button";
import FeedbackForm from '../../components/feedback-form/feedback-form';
import EmailInput from '../../components/email-input/email-input';
import TextArea from '../../components/text-area/text-area';
import AttachButton from '../../components/attach-button/attach-button';
import Checkbox from '../../components/checkbox/checkbox';
import SubmitButton from '../../components/submit-button/submit-button';
/**
 * Объект со всеми компонентами, для которых будет применяться автоматическая инициализация
 * Ключ объекта - Название компонента, которое было указано во время его создания (совпадает с именем файлов)
 * Значение - JS-класс компонента (Импорт добавляется вручную)
 */
const allComponents = {
    'example-button': ExampleButton,
    'feedback-form': FeedbackForm,
    'email-input': EmailInput,
    'text-area': TextArea,
    'attach-button': AttachButton,
    'checkbox': Checkbox,
    'submit-button': SubmitButton    
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