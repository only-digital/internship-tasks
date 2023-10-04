import Component from '../../app/js/base/Component';

class DescriptionText extends Component {
    checkbox;
    textElement;
    svgPlus;
    svgCross;
    blockHeight;
    margBottom;

    constructor(element) {
        super(element);

        const winWidth = window.innerWidth;

        const textBottomMargin = {
            375: 20,
            768: 24,
            1280: 24,
            1440: 30,
            1920: 30
        }

        this.margBottom = 0;

        for (let wid in textBottomMargin) {
            if (wid >= winWidth) {
               this.margBottom = textBottomMargin[wid];
               break;
            } else {
                this.margBottom = textBottomMargin[wid]
            }
        }

        this.blockHeight = this.root.offsetHeight;

        this.root.style.height = this.blockHeight + 'px';

        this.checkbox = this.getElement('input');

        this.textElement = this.getElement('text');

        this.root.addEventListener('click', this.onButtonClick);
        
    }

    onButtonClick = () => {
        let checkboxChecked = this.checkbox.checked;
        switch (checkboxChecked) {
            case false:
                this.checkbox.checked = true;
                this.root.style.height = `${this.blockHeight + this.textElement.offsetHeight + this.margBottom}px`;
                break;
            case true:
                this.checkbox.checked = false;
                this.root.style.height = `${this.blockHeight}px`;
                break;
        }
    }

}

export default DescriptionText