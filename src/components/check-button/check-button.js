import Component from '../../app/js/base/component';

class CheckButton extends Component {
    checkBox;
    count = 0 ;
    constructor(element) {
        super(element);
        
        this.checkBox = this.getElement('inpt');
        this.checkBox.addEventListener('change',this.onCheck)
      
    }
        
    onCheck = () => {
        localStorage.setItem('checkCount',JSON.stringify(this.count++))
    }
    
}

export default CheckButton