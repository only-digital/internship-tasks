import ExampleButton from '../../components/example-button/example-button';
import Input from '../../components/input/input';
import FileInput from '../../components/file-input/file-input';
import Form from '../../components/form/form';
import feedbackForm from '../../components/feedback-form/feedback-form';
import inputCheckbox from '../../components/input-checkbox/input-checkbox';
import inputSubmit from '../../components/input-submit/input-submit';
/**
 * Объект со всеми компонентами, для которых будет применяться автоматическая инициализация
 * Ключ объекта - Название компонента, которое было указано во время его создания (совпадает с именем файлов)
 * Значение - JS-класс компонента (Импорт добавляется вручную)
 */
const allComponents = {
  'example-button': ExampleButton,
  input: Input,
  'file-input': FileInput,
  form: Form,
  'feedback-form': feedbackForm,
  'input-checkbox': inputCheckbox,
  'input-submit': inputSubmit,
};

/**
 * Инициализация всех компонентов на странице
 */
try {
  const existedComponents = Array.from(
    document.querySelectorAll('[data-component]')
  );

  const components = existedComponents.map((component) => {
    try {
      return new allComponents[component.dataset.component]({
        name: component.dataset.component,
        component: component,
      });
    } catch (e) {
      console.error(
        `Ошибка во время инициализации компонента: ${component.dataset.component}\n\n${e}`
      );
    }
  });
} catch (e) {
  console.error(e);
}
