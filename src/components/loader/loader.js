import Component from '../../app/js/base/component';

class Loader extends Component {
    constructor(element) {
        super(element);
        setTimeout(() => {
        this.root.style.display = 'none'},5050)
    }

    // Your code here
}

export default Loader