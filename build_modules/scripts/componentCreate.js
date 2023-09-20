const fs = require('fs');
const path = require('path');
const Logger = require('./Logger');

const logger = new Logger();

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
String.prototype.fromKebabToCamel = function() {
    return this.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase());
}

const args = process.argv;
const componentName = args[2];

const pathFileExt = (path, ext) => `${path}.${ext}`;

try {
    if (!componentName) {
        throw new Error('Введите название компонента')
    }

    const components = fs.readdirSync(path.join('src', 'components'));
    if (components.findIndex((component) => component === componentName) !== -1)
        throw new Error('Компонент уже существует');

    const componentClassName = componentName.fromKebabToCamel().capitalize();
    const folderPath = path.join('src', 'components', componentName);
    const filePath = path.join(folderPath, componentName);

    fs.mkdirSync(folderPath);
    logger.info(`Создана папка ${folderPath}`);

    const scssPath = pathFileExt(filePath, 'module.scss');
    fs.writeFileSync(scssPath, `.${componentClassName} {\n\t//Your code here\n}`);
    logger.info(`Создан файл ${scssPath}`);

    const componentTemplate = fs
        .readFileSync(path.join(__dirname, 'component.jsxtpl'))
        .toString();
    const jsPath = pathFileExt(filePath, 'jsx');
    fs.writeFileSync(jsPath, eval('`' + componentTemplate + '`'));
    logger.info(`Создан файл ${jsPath}`);

    logger.success(`Компонент ${componentName} создан`);
} catch (e) {
    logger.error(e);
}
