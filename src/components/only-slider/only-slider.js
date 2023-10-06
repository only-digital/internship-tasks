import Component from '../../app/js/base/component';

class OnlySlider extends Component {
    listItems;
    items;
    constructor(element) {
        super(element);

        this.listItems=this.getElement('block-content');
        this.items = this.listItems.querySelectorAll('.only-li-content');
        
        for(let i=0;i<this.items.length;i++){
            if(i==0){
                this.items[i].setAttribute('first','true');
            }



        }
        // Your code here
    }


    // Your code here
}

export default OnlySlider