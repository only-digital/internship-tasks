"use strict";

var _exampleButton = _interopRequireDefault(require("../../components/example-button/example-button"));

var _feedbackForm = _interopRequireDefault(require("../../components/feedback-form/feedback-form"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Объект со всеми компонентами, для которых будет применяться автоматическая инициализация
 * Ключ объекта - Название компонента, которое было указано во время его создания (совпадает с именем файлов)
 * Значение - JS-класс компонента (Импорт добавляется вручную)
 */
var allComponents = {
  'example-button': _exampleButton["default"],
  'feedback-form': _feedbackForm["default"]
};
/**
 * Инициализация всех компонентов на странице
 */

try {
  var existedComponents = Array.from(document.querySelectorAll('[data-component]'));
  var components = existedComponents.map(function (component) {
    try {
      return new allComponents[component.dataset.component]({
        name: component.dataset.component,
        component: component
      });
    } catch (e) {
      console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u043E \u0432\u0440\u0435\u043C\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u0430: ".concat(component.dataset.component, "\n\n").concat(e));
    }
  });
} catch (e) {
  console.error(e);
}
//# sourceMappingURL=common.dev.js.map
