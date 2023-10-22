import ExampleButton from "../../components/example-button/example-button";
import EmailField from "../../components/email-field/email-field";
import TextareaField from "../../components/textarea-field/textarea-field";
import FileField from "../../components/file-field/file-field";
import CheckboxField from "../../components/checkbox-field/checkbox-field";
import SubmitButton from "../../components/submit-button/submit-button";

/**
 * Объект со всеми компонентами, для которых будет применяться автоматическая инициализация
 * Ключ объекта - Название компонента, которое было указано во время его создания (совпадает с именем файлов)
 * Значение - JS-класс компонента (Импорт добавляется вручную)
 */
const allComponents = {
  "example-button": ExampleButton,
  "email-field": EmailField,
  "textarea-field": TextareaField,
  "file-field": FileField,
  "checkbox-field": CheckboxField,
  "submit-button": SubmitButton,
};

/**
 * Инициализация всех компонентов на странице
 */
try {
  const existedComponents = Array.from(
    document.querySelectorAll("[data-component]")
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
