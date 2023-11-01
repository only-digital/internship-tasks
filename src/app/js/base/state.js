/**
 * @description State to store local variables, for now it will be only uploaded files
 */
class State {
    files;

    constructor() {
        this.files = []
    }

    setState(files) {
        this.files = files
    }

}

export default State;