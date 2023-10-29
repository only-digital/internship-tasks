import Component from '../../app/js/base/component';

class OnlyAgreement extends Component {
    checkbox;
    constructor(element) {
        super(element);

        this.checkbox = this.getElement('checkbox');
        this.checkbox.addEventListener('click',this.checkedAgreement);
    }

    checkedAgreement=()=>{
        (this.checkbox.checked)
            ?this.root.classList.add('only-agreement_validate')
            :this.root.classList.remove('only-agreement_validate');
    }
}

export default OnlyAgreement