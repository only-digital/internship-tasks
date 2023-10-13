import ExampleButton from '../../components/example-button/example-button';
import Accordion from '../../components/accordion/accordion';

/**
 * Объект со всеми компонентами, для которых будет применяться автоматическая инициализация
 * Ключ объекта - Название компонента, которое было указано во время его создания (совпадает с именем файлов)
 * Значение - JS-класс компонента (Импорт добавляется вручную)
 */
const allComponents = {
	'example-button': ExampleButton,
	accordion: Accordion
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
				component: component
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
