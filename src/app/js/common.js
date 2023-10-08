import VacancyHeader from '../../components/vacancy-header/vacancy-header';
import VacancyForm from '../../components/vacancy-form/vacancy-form';

/**
 * Объект со всеми компонентами, для которых будет применяться автоматическая инициализация
 * Ключ объекта - Название компонента, которое было указано во время его создания (совпадает с именем файлов)
 * Значение - JS-класс компонента (Импорт добавляется вручную)
 */
const allComponents = {
  'vacancy-header': VacancyHeader,
  'vacancy-form': VacancyForm,
};

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
      console.error(
        `Ошибка во время инициализации компонента: ${component.dataset.component}\n\n${e}`,
      );
    }
  });
} catch (e) {
  console.error(e);
}
