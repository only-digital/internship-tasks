import Component from '../../app/js/base/component';

class OnlyAgreement extends Component {
    checkbox;
    agreementClick;
    customCheck;
    
    constructor(element) {
        super(element);

        this.checkbox = this.getElement('checkbox');
        this.customCheck = this.getElement('custom-check');
        this.customCheck.addEventListener('click',this.checkedAgreement)
        this.agreementClick = new Event('agreementClick',{bubbles:true});
    }

    checkedAgreement=()=>{
        this.checkbox.click();
        (this.checkbox.checked)
            ?this.root.classList.add('only-agreement_validate')
            :this.root.classList.remove('only-agreement_validate');
        this.root.dispatchEvent(this.agreementClick);
    }
}

export default OnlyAgreement