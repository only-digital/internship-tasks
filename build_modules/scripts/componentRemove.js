const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const Logger = require('./Logger');

const logger = new Logger();

const args = process.argv;
const componentName = args[2];

try {
    if (!componentName) throw new Error('Введите название компонента');

    const components = fs.readdirSync(path.join('src', 'components'));
    if (components.findIndex((component) => component === componentName) === -1)
        throw new Error('Компонент не существует');

    const folderPath = path.join('src', 'components', componentName);

    const componentsPathScss = path.join('build_modules', 'common.scss');
    const importViewScss = `@import '../src/components/${componentName}/${componentName}';\n`;

    const componentsPathPug = path.join('build_modules', 'common.pug');
    const importComponentPug = `include ../src/components/${componentName}/${componentName}\n`;

    const componentsScss = fs.readFileSync(componentsPathScss, 'utf-8');
    const componentsPug = fs.readFileSync(componentsPathPug, 'utf-8');

    fs.writeFileSync(componentsPathScss, componentsScss.replace(importViewScss, ''));
    logger.info(`Удален импорт в файле ${componentsPathScss}`);
    fs.writeFileSync(componentsPathPug, componentsPug.replace(importComponentPug, ''));
    logger.info(`Удален импорт в файле ${componentsPathPug}`);

    rimraf(folderPath, (err) => {
        if (err) throw new Error(err.message);
        logger.success(`Компонент ${componentName} удален`);
    });
} catch (e) {
    logger.error(e);
}
