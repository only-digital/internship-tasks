import Component from '../../app/js/base/Component';

class SpoilerComponent extends Component {
    titleLinkEl;
    icon;
    textBlockEl;
    titleNameEL;
    constructor(element) {
        super(element);
        this.titleLinkEl = this.getElement('title');
        this.icon = this.getElement('title-button');
        this.textBlockEl = this.getElement('desc-block');
        this.titleNameEL = [...this.getElement('title-text').children];

        if (this.textBlockEl.classList.contains('show')) {
            this.textBlockEl.style.maxHeight = this.textBlockEl.scrollHeight + "px";
            this.addClass();
        }

        this.titleLinkEl.addEventListener('click', this.openSpoiler);
    };

    openSpoiler = (e) => {
        e.preventDefault();
        this.icon.classList.toggle('rotate');
        this.icon.classList.toggle('normal');
        if (this.textBlockEl.style.maxHeight) {
            this.textBlockEl.style.maxHeight = null;
            this.removeClass();
        } else {
            this.textBlockEl.style.maxHeight = this.textBlockEl.scrollHeight + "px";
            this.textBlockEl.classList.add('show');
            this.addClass();
        }
    };

    addClass = () => {
        this.titleNameEL.forEach((e) => {
            e.classList.add('blue');
        })
    };

    removeClass = () => {
        this.titleNameEL.forEach((e) => {
            e.classList.remove('blue');
        })
    }
}

export default SpoilerComponent

