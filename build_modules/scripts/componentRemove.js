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

    rimraf(folderPath, (err) => {
        if (err) throw new Error(err.message);
        logger.success(`Компонент ${componentName} удален`);
    });
} catch (e) {
    logger.error(e);
}
