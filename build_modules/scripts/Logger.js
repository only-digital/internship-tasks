const path = require('path');
const colors = require('colors');

class Logger {
    #hasErrors = false;

    constructor() {
        const mainModule = path.parse(process.mainModule.filename)
        const moduleType = mainModule.dir.split(path.sep).slice(-1)[0];

        this.#init(path.join(moduleType, mainModule.base));
    }

    #init(data) {
        console.log(colors.dim.bold('[ START ]'), colors.dim('script'), colors.dim.underline(data))

        process.on('exit', () => {
            const color = this.#hasErrors ? 'red' : 'green';
            console.log(
                colors[color].bold('[ END ]'),
                colors[color](this.#hasErrors ? 'Error' : 'Success'),
                colors[color].underline(data)
            )
        })

        process.on('uncaughtException', (e) => this.error(e));
    }

    info(...data) {
        console.info(colors.blue.bold('[ INFO ]'), ...data)
    }

    success(...data) {
        console.info(colors.green.bold('[ DONE ]'), colors.green(...data))
    }

    warn(...data) {
        console.warn(colors.yellow.bold('[ WARN ]'), colors.yellow(...data))
    }

    error(e) {
        this.#hasErrors = true;
        console.error(colors.red(e));
    }
}

module.exports = Logger;
