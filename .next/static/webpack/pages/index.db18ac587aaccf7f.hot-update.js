"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./src/components/tasks-list/tasks-list.jsx":
/*!**************************************************!*\
  !*** ./src/components/tasks-list/tasks-list.jsx ***!
  \**************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TasksList: function() { return /* binding */ TasksList; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _tasks_list_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tasks-list.module.scss */ \"./src/components/tasks-list/tasks-list.module.scss\");\n/* harmony import */ var _tasks_list_module_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_tasks_list_module_scss__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _task_task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../task/task */ \"./src/components/task/task.jsx\");\n/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/hooks */ \"./src/hooks/index.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\nconst TasksList = (param)=>{\n    let { data } = param;\n    _s();\n    const [tasks, setTasks] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(data.tasks);\n    const [inputValue, setInputValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const searchResults = (0,_hooks__WEBPACK_IMPORTED_MODULE_3__.useSearch)(inputValue, tasks);\n    console.log(searchResults);\n    // return (<></>)\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_tasks_list_module_scss__WEBPACK_IMPORTED_MODULE_4___default().TasksList),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_tasks_list_module_scss__WEBPACK_IMPORTED_MODULE_4___default().TasksList__header),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                        children: data.title\n                    }, void 0, false, {\n                        fileName: \"/home/mohammed/projects/only_internship/tasks/src/components/tasks-list/tasks-list.jsx\",\n                        lineNumber: 16,\n                        columnNumber: 17\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        type: \"text\",\n                        placeholder: \"Поиск\",\n                        onChange: (e)=>setInputValue(e.target.value)\n                    }, void 0, false, {\n                        fileName: \"/home/mohammed/projects/only_internship/tasks/src/components/tasks-list/tasks-list.jsx\",\n                        lineNumber: 17,\n                        columnNumber: 17\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/mohammed/projects/only_internship/tasks/src/components/tasks-list/tasks-list.jsx\",\n                lineNumber: 15,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_tasks_list_module_scss__WEBPACK_IMPORTED_MODULE_4___default().TasksList__items),\n                children: searchResults.map((item, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_task_task__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                        task: item,\n                        list: tasks,\n                        removeHandler: setTasks\n                    }, index, false, {\n                        fileName: \"/home/mohammed/projects/only_internship/tasks/src/components/tasks-list/tasks-list.jsx\",\n                        lineNumber: 25,\n                        columnNumber: 21\n                    }, undefined))\n            }, void 0, false, {\n                fileName: \"/home/mohammed/projects/only_internship/tasks/src/components/tasks-list/tasks-list.jsx\",\n                lineNumber: 23,\n                columnNumber: 13\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/mohammed/projects/only_internship/tasks/src/components/tasks-list/tasks-list.jsx\",\n        lineNumber: 14,\n        columnNumber: 9\n    }, undefined);\n};\n_s(TasksList, \"okvzLLQs28TiMAFtTnAhixLrpDw=\", false, function() {\n    return [\n        _hooks__WEBPACK_IMPORTED_MODULE_3__.useSearch\n    ];\n});\n_c = TasksList;\nvar _c;\n$RefreshReg$(_c, \"TasksList\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy90YXNrcy1saXN0L3Rhc2tzLWxpc3QuanN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQWlDO0FBQ2E7QUFDZDtBQUNJO0FBRTdCLE1BQU1JLFlBQVk7UUFBQyxFQUFFQyxJQUFJLEVBQUU7O0lBRTlCLE1BQU0sQ0FBQ0MsT0FBT0MsU0FBUyxHQUFHUCwrQ0FBUUEsQ0FBQ0ssS0FBS0MsS0FBSztJQUM3QyxNQUFNLENBQUNFLFlBQVlDLGNBQWMsR0FBR1QsK0NBQVFBLENBQUM7SUFDN0MsTUFBTVUsZ0JBQWdCUCxpREFBU0EsQ0FBQ0ssWUFBWUY7SUFDNUNLLFFBQVFDLEdBQUcsQ0FBQ0Y7SUFDWixpQkFBaUI7SUFDakIscUJBQ0ksOERBQUNHO1FBQUlDLFdBQVdiLDBFQUFnQjs7MEJBQzVCLDhEQUFDWTtnQkFBSUMsV0FBV2Isa0ZBQXdCOztrQ0FDcEMsOERBQUNlO2tDQUFJWCxLQUFLWSxLQUFLOzs7Ozs7a0NBQ2YsOERBQUNDO3dCQUNHQyxNQUFLO3dCQUNMQyxhQUFZO3dCQUNaQyxVQUFVLENBQUNDLElBQU1iLGNBQWNhLEVBQUVDLE1BQU0sQ0FBQ0MsS0FBSzs7Ozs7Ozs7Ozs7OzBCQUdyRCw4REFBQ1g7Z0JBQUlDLFdBQVdiLGlGQUF1QjswQkFDbENTLGNBQWNnQixHQUFHLENBQUMsQ0FBQ0MsTUFBTUMsc0JBQ3RCLDhEQUFDMUIsa0RBQUlBO3dCQUNEMkIsTUFBTUY7d0JBQ05HLE1BQU14Qjt3QkFDTnlCLGVBQWV4Qjt1QkFDVnFCOzs7Ozs7Ozs7Ozs7Ozs7O0FBTTdCLEVBQUM7R0E3Qll4Qjs7UUFJYUQsNkNBQVNBOzs7S0FKdEJDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL3Rhc2tzLWxpc3QvdGFza3MtbGlzdC5qc3g/ZWQ0NSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnLi90YXNrcy1saXN0Lm1vZHVsZS5zY3NzJztcbmltcG9ydCBUYXNrIGZyb20gJy4uL3Rhc2svdGFzayc7XG5pbXBvcnQgeyB1c2VTZWFyY2ggfSBmcm9tICdAL2hvb2tzJztcblxuZXhwb3J0IGNvbnN0IFRhc2tzTGlzdCA9ICh7IGRhdGEgfSkgPT4ge1xuXG4gICAgY29uc3QgW3Rhc2tzLCBzZXRUYXNrc10gPSB1c2VTdGF0ZShkYXRhLnRhc2tzKTtcbiAgICBjb25zdCBbaW5wdXRWYWx1ZSwgc2V0SW5wdXRWYWx1ZV0gPSB1c2VTdGF0ZSgnJyk7XG4gICAgY29uc3Qgc2VhcmNoUmVzdWx0cyA9IHVzZVNlYXJjaChpbnB1dFZhbHVlLCB0YXNrcyk7XG4gICAgY29uc29sZS5sb2coc2VhcmNoUmVzdWx0cylcbiAgICAvLyByZXR1cm4gKDw+PC8+KVxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZWQuVGFza3NMaXN0fT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZWQuVGFza3NMaXN0X19oZWFkZXJ9PlxuICAgICAgICAgICAgICAgIDxoMj57ZGF0YS50aXRsZX08L2gyPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPSfQn9C+0LjRgdC6J1xuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldElucHV0VmFsdWUoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZWQuVGFza3NMaXN0X19pdGVtc30+XG4gICAgICAgICAgICAgICAge3NlYXJjaFJlc3VsdHMubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8VGFza1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFzaz17aXRlbX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3Q9e3Rhc2tzfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlSGFuZGxlcj17c2V0VGFza3N9XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIClcbn1cbiJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInN0eWxlZCIsIlRhc2siLCJ1c2VTZWFyY2giLCJUYXNrc0xpc3QiLCJkYXRhIiwidGFza3MiLCJzZXRUYXNrcyIsImlucHV0VmFsdWUiLCJzZXRJbnB1dFZhbHVlIiwic2VhcmNoUmVzdWx0cyIsImNvbnNvbGUiLCJsb2ciLCJkaXYiLCJjbGFzc05hbWUiLCJUYXNrc0xpc3RfX2hlYWRlciIsImgyIiwidGl0bGUiLCJpbnB1dCIsInR5cGUiLCJwbGFjZWhvbGRlciIsIm9uQ2hhbmdlIiwiZSIsInRhcmdldCIsInZhbHVlIiwiVGFza3NMaXN0X19pdGVtcyIsIm1hcCIsIml0ZW0iLCJpbmRleCIsInRhc2siLCJsaXN0IiwicmVtb3ZlSGFuZGxlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/tasks-list/tasks-list.jsx\n"));

/***/ })

});