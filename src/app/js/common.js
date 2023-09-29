import Btn from "../../components/btn/btn";
import BtnFile from "../../components/btn-file/btn-file";
import TextArea from "../../components/text-area/text-area";
import InputField from "../../components/input-field/input-field";
import Checkbox from "../../components/checkbox/checkbox";
import Form from "../../components/form/form";

/**
 * Объект со всеми компонентами, для которых будет применяться автоматическая инициализация
 * Ключ объекта - Название компонента, которое было указано во время его создания (совпадает с именем файлов)
 * Значение - JS-класс компонента (Импорт добавляется вручную)
 */
const allComponents = {
	 'btn': Btn,
	 'btn-file': BtnFile,
	 'text-area': TextArea,
	 'input-field': InputField,
	 'checkbox': Checkbox,
	 'form': Form,
	 

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