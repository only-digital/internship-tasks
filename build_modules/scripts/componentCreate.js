const fs = require('fs');
const path = require('path');
const Logger = require('./Logger');

const logger = new Logger();

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
String.prototype.fromKebabToCamel = function () {
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

    const componentsPathScss = path.join('build_modules', 'common.scss');
    const importViewScss = `@import '../src/components/${componentName}/${componentName}';\n`;

    let componentsScss = fs.readFileSync(componentsPathScss, 'utf-8');
    componentsScss = importViewScss + componentsScss;

    const componentsPathPug = path.join('build_modules', 'common.pug');
    const importComponentPug = `include ../src/components/${componentName}/${componentName}\n`;

    let componentsPug = fs.readFileSync(componentsPathPug, 'utf-8');
    componentsPug = importComponentPug + componentsPug;

    fs.mkdirSync(folderPath);
    logger.info(`Создана папка ${folderPath}`);

    const pugPath = pathFileExt(filePath, 'pug');
    fs.writeFileSync(pugPath, `mixin ${componentName}(props)\n\t.${componentName}&attributes(attributes)(data-component='${componentName}')\n\t\t//Your code here`);
    logger.info(`Создан файл ${pugPath}`);

    const scssPath = pathFileExt(filePath, 'scss');
    fs.writeFileSync(scssPath, `.${componentName} {\n\t$root: &;\n\n\t//Your code here\n}`);
    logger.info(`Создан файл ${scssPath}`);

    const componentTemplate = fs
        .readFileSync(path.join(__dirname, 'component.jstpl'))
        .toString();
    const jsPath = pathFileExt(filePath, 'js');
    fs.writeFileSync(jsPath, eval('`' + componentTemplate + '`'));
    logger.info(`Создан файл ${jsPath}`);

    fs.writeFileSync(componentsPathScss, componentsScss);
    logger.info(`Добавлен импорт в файле ${componentsPathScss}`);

    fs.writeFileSync(componentsPathPug, componentsPug);
    logger.info(`Добавлен импорт в файле ${componentsPathPug}`);

    logger.success(`Компонент ${componentName} создан`);
} catch (e) {
    logger.error(e);
}
