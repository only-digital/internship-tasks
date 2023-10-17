import Feedback from '../../components/feedback/feedback';
import Button from '../../components/button/button';
import List from '../../components/list/list';
import VacancyPage from '../../components/vacancy-page/vacancy-page';
import CheckButton from '../../components/check-button/check-button';
import Loader from '../../components/loader/loader';
/**
 * Объект со всеми компонентами, для которых будет применяться автоматическая инициализация
 * Ключ объекта - Название компонента, которое было указано во время его создания (совпадает с именем файлов)
 * Значение - JS-класс компонента (Импорт добавляется вручную)
 */
const allComponents = {
    'feedback': Feedback,
    'button': Button,
    'list': List,
    'vacancy-page': VacancyPage,
    'check-button': CheckButton,
    'loader': Loader
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
            console.error(`Ошибка во время инициализации компонента: ${component.dataset.component}\n\n${e}`);
        }
    });
} catch (e) {
    console.error(e);
}

document.addEventListener('DOMContentLoaded',()=>{
    fetch('/stats')
           .then(res => res.json())
           .then(data =>{ 
            localStorage.setItem('statData',JSON.stringify(data)),
            localStorage.setItem('checkCount',JSON.stringify(1))
        } )

})

