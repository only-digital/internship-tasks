import Component from '../../app/js/base/component';

class Spoiler extends Component {
    constructor(element) {
        super(element);

        this.root.addEventListener("click", this.onSpoilerClick);
    }

    onSpoilerClick= (e) => {
        const elHeader = e.target.closest('.spoiler__header');
        if (!elHeader) {
            return;
        }
        console.log(e.currentTarget);
        e.currentTarget.classList.toggle("spoiler-opened");
    };
}

export default Spoiler