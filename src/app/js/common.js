import ExampleButton from "../../components/example-button/example-button";
import Title from "../../components/title/title";
import Description from "../../components/description/description";
import Feedback from "../../components/feedback/feedback";
import FormButton from "../../components/form-button/form-button";
import FormResponse from "../../components/form-response/form-response";
import InputCheckbox from "../../components/input-checkbox/input-checkbox";
import InputText from "../../components/input-text/input-text";
import Loader from "../../components/loader/loader";

/**
 * Объект со всеми компонентами, для которых будет применяться автоматическая инициализация
 * Ключ объекта - Название компонента, которое было указано во время его создания (совпадает с именем файлов)
 * Значение - JS-класс компонента (Импорт добавляется вручную)
 */
const allComponents = {
  "example-button": ExampleButton,
  title: Title,
  description: Description,
  feedback: Feedback,
  "form-button": FormButton,
  "form-response": FormResponse,
  "input-checkbox": InputCheckbox,
  "input-text": InputText,
  loader: Loader,
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
