import Loader from "../../components/loader/loader";
import Header from "../../components/header/header";
import Main from "../../components/main/main";
import List from "../../components/list/list";
import FeedBack from "../../components/feedback/feedback";

/**
 * Объект со всеми компонентами, для которых будет применяться автоматическая инициализация
 * Ключ объекта - Название компонента, которое было указано во время его создания (совпадает с именем файлов)
 * Значение - JS-класс компонента (Импорт добавляется вручную)
 */
const allComponents = {
  loader: Loader,
  header: Header,
  main: Main,
  list: List,
  feedback: FeedBack,
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
