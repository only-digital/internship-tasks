import Component from '../../app/js/base/Component';

class Vacancy extends Component {
    constructor(element) {
        super(element);

        this.email = this.getElement('email').getElementsByTagName('input')[0];
        this.confirm = this.getElement('checkbox').getElementsByTagName('input')[0];
        this.btn = this.getElement('sendForm');

        this.loader = document.querySelector('.loader');

        this.checkBox = this.getElement('checkbox').getElementsByTagName('input')[0];
        this.yes = this.getElement('checkbox-yes');
        this.success = this.getElement('success');


        this.whiteBlock = this.getElement('whiteBlock');

        this.status = this.getElement('status');
        
        this.views = this.getElement('views').getElementsByTagName('span')[0];
        this.responses = this.getElement('responses').getElementsByTagName('span')[0];
        
        this.getData();

        this.btn.addEventListener("click", this.sendData);
        this.checkBox.addEventListener("click", this.agreeConfirm);
    }

    agreeConfirm = () => {
        this.checkBox.classList.toggle('agree');
        this.yes.classList.toggle('correct')

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

        if (res === 'confirm') {
            this.status.textContent = 'Необходимо подтвердить согласие с обработкой персональных данных';
            this.status.classList.toggle('correct');
            return false;
        }

        if ((res === 'restart') && (!this.status.classList.contains('correct')))
            this.status.classList.add('correct');
            
        return true;
    }

    dataValidation = (check) => {
        if (check.email === '') 
        { 
            this.showValidationResult('none');
            return false;
        }

        const emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
        if (!emailRegexp.test(check.email))
        {
            this.showValidationResult('incorrect');
            return false;
        }

        if (!check.confirm) {
            this.showValidationResult('confirm');
            return false;
        }
        
        return true;
    }

    postRequestStatus = (status,msg) => {
        this.loader.classList.toggle('hide');
        if (status === 'error') {
            if (this.dataValidation(msg))
            {
                this.status.textContent = 'Ошибка не сервере. Попробуйте еще раз';
                this.status.classList.toggle('correct');
            }
        }

        if (status === 'ok') {
            this.whiteBlock.classList.toggle('correct');

            
            this.success.classList.toggle('correct');
            this.btn.classList.toggle('correct')
        }
    }

    sendData = () => {


        this.showValidationResult('restart');

        let msg = {
            email: this.email.value,
            confirm: this.confirm.checked
        }


        const self = this;
        self.loader.classList.toggle('hide');
        fetch('http://localhost:3000/form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify(msg)
        })

        .then(function (response) {
            setTimeout(function () {
                if (response.status === 422)
                    self.postRequestStatus('error', msg)
                else if (response.status === 200)
                    self.postRequestStatus('ok', msg)
            }, 5000); // 5000 миллисекунд (5 секунд)
        })

        .catch(function (error) {
            console.error(error);
            });
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