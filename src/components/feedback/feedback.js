import Component from '../../app/js/base/component';


class Feedback extends Component {
    inpt;
    form;
    spanError;
    confirmBoollian;
    regular;
    formDone;
    constructor(element) {
        super(element);
        this.inpt = this.getElement('inpt');
        this.form = this.getElement('form');
        this.form.addEventListener('submit', this.onSubmit);
        this.spanError = this.getElement('span-error');
        this.regular = /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/;
        this.formDone = this.getElement('form-done')
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log('work')
        this.confirmBoollian = false;
        
        if(JSON.parse(localStorage.getItem('checkCount'))%2===0){
            this.confirmBoollian = true;
        }

        if(this.inpt.value!==''){
        fetch('/form', {
            method: 'POST',
            body: JSON.stringify({
                email: `${this.inpt.value}`,
                confirm: this.confirmBoollian
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {console.log(res)
            
            
              if(this.regular.test(this.inpt.value)===false){ 
                this.spanError.textContent = "Некорректный формат email",
                this.spanError.style.opacity ='1'
            }

            if(this.regular.test(this.inpt.value)===true&&JSON.parse(localStorage.getItem('checkCount'))%2!==0){
                this.spanError.textContent = "Подтвердите обработку данных",
                this.spanError.style.opacity ='1'
            }

            if (res.ok ) {
                this.form.style.opacity = '0.3',
                this.form.style.pointerEvents = 'none',
                this.spanError.textContent = '',
                this.form.lastChild.style.display = 'none',
                this.formDone.style.display = 'flex'
            }
        }
      )
    }else{this.spanError.style.opacity ='1'}
}

}
export default Feedback