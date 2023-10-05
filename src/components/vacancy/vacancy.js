import Component from '../../app/js/base/Component';

class Vacancy extends Component {
    constructor(element) {
        super(element);

        this.email = this.getElement('email').getElementsByTagName('input')[0];
        this.confirm = this.getElement('checkbox').getElementsByTagName('input')[0];
        this.btn = this.getElement('sendForm');

        this.checkBox = this.getElement('checkbox').getElementsByTagName('input')[0];
        this.s = this.getElement('s');
        this.success = this.getElement('success');

        this.status = this.getElement('status');
        
        this.views = this.getElement('views').getElementsByTagName('span')[0];
        this.responses = this.getElement('responses').getElementsByTagName('span')[0];
        
        this.getData();

        this.btn.addEventListener("click", this.sendData);
        this.checkBox.addEventListener("click", this.agreeConfirm);
    }

    agreeConfirm = () => {
        this.checkBox.classList.add('agree');
        this.s.classList.toggle('correct')
        
        console.log('agree')
    }
    showValidationResult = (res) => {
        
        if (res === 'none')
        {
            this.status.textContent = 'Поле E-mail обязательно';
            this.status.classList.toggle('correct');
            return false;
        }
        
        if (res === 'incorrect')
        {
            this.status.textContent = 'Некорректный E-mail';
            this.status.classList.toggle('correct');
            return false;
        }

        if ((res === 'restart') && (!this.status.classList.contains('correct')))
            this.status.classList.add('correct');
            
        return true;
    }

    dataValidation = (check) => {
        if (check === '') 
        { 
            this.showValidationResult('none');
            return false;
        }

        const emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
        if (!emailRegexp.test(check))
        {
            this.showValidationResult('incorrect');
            return false;
        }
        
        return true;
    }

    postRequestStatus = (status) => {
       // if (status === 'error') {
      //      this.status.textContent = 'Ошибка не сервере. Попробуйте еще раз';
      //      this.status.classList.toggle('correct');
      //  }

        if (status === 'error') {
            this.success.classList.toggle('correct');
            this.btn.classList.toggle('correct')
        }
    }

    sendData = () => {

        this.showValidationResult('restart');

        this.confirm.value === 'on' ? confirm = true : false;

        let msg = {
            email: this.email.value,
            confirm: false
        }

        if (this.dataValidation(msg.email))
        {
            const self = this;
            fetch('http://localhost:3000/form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify(msg)
            })

            .then(function (response) {
                if (response.status === 422)
                    self.postRequestStatus('error')
                else if (response.status === 200)
                    self.postRequestStatus('ok')
            })

            .catch(function (error) {
                console.error(error);
            });
        }

    }

    parseData = (data) => {
        this.views.textContent = data.views;
        this.responses.textContent = data.responses;
    }

    getData = () => {
        fetch('http://localhost:3000/stats')
        .then((response) => { return response.json(); })
        .then((data) => { this.parseData(data); })
        .catch((error) => console.error(error))
    }
}

export default Vacancy