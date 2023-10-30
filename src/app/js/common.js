import ExampleButton from "../../components/example-button/example-button";
import Grid from "../../components/grid/grid";
import MainTitle from "../../components/main-title/main-title";
import MyForm from "../../components/my-form/my-form";
import MyList from "../../components/my-list/my-list";

/**
 * Объект со всеми компонентами, для которых будет применяться автоматическая инициализация
 * Ключ объекта - Название компонента, которое было указано во время его создания (совпадает с именем файлов)
 * Значение - JS-класс компонента (Импорт добавляется вручную)
 */
const allComponents = {
  "example-button": ExampleButton,
  "my-list": MyList,
  "main-title": MainTitle,
  "my-form": MyForm,
  grid: Grid,
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
