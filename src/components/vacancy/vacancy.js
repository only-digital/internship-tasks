import Component from '../../app/js/base/Component';

class Vacancy extends Component {
    constructor(element) {
        super(element);

        this.getData();

        this.email = this.getElement('email').getElementsByTagName('input')[0];
        this.confirm = this.getElement('checkbox').getElementsByTagName('input')[0];
        this.yes = this.getElement('checkbox-yes');
        this.success = this.getElement('success');
        this.btn = this.getElement('sendForm');

        this.loader = document.querySelector('.loader');

        this.whiteBlock = this.getElement('whiteBlock');

        this.status = this.getElement('status');
        
        this.views = this.getElement('views').getElementsByTagName('span')[0];
        this.responses = this.getElement('responses').getElementsByTagName('span')[0];
        
        this.btn.addEventListener("click", this.sendData);
        this.confirm.addEventListener("click", this.agreeConfirm);
    }

    agreeConfirm = () => {
        this.confirm.classList.toggle('agree');
        this.yes.classList.toggle('hidden')
    }

    showValidationResult = (res) => {
        
        if (res === 'none')
        {
            this.status.textContent = 'Поле E-mail обязательно';
            this.status.classList.toggle('hidden');
            return false;
        }
        
        if (res === 'email')
        {
            this.status.textContent = 'Некорректный E-mail';
            this.status.classList.toggle('hidden');
            return false;
        }

        if (res === 'confirm') {
            this.status.textContent = 'Необходимо подтвердить согласие с обработкой персональных данных';
            this.status.classList.toggle('hidden');
            return false;
        }

        if ((res === 'restart') && (!this.status.classList.contains('hidden')))
            this.status.classList.add('hidden');
            
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
            this.showValidationResult('email');
            return false;
        }

        if (!check.confirm) {
            this.showValidationResult('confirm');
            return false;
        }
        
        return true;
    }

    postRequestStatus = (status,msg) => {
        this.loader.classList.toggle('hidden');

        if (status === 'error') {
            if (this.dataValidation(msg)) //если ошибка не в данных
            {
                this.status.textContent = 'Ошибка не сервере. Попробуйте еще раз';
                this.status.classList.toggle('hidden');
            }
        }

        if (status === 'ok') {
            this.whiteBlock.classList.toggle('hidden');

            this.success.classList.toggle('hidden');
            this.btn.classList.toggle('hidden')
        }
    }

    sendData = () => {

        //скрываем строку с ошибкой (если она есть)
        this.showValidationResult('restart'); 

        let msg = {
            email: this.email.value,
            confirm: this.confirm.checked
        }

        const self = this;
        self.loader.classList.toggle('hidden');
        
        fetch('http://localhost:3000/form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify(msg)
        })

        .then(function (response) {
            setTimeout(function () {
                if (!response.ok)
                    self.postRequestStatus('error', msg)
                else 
                    self.postRequestStatus('ok', msg)
            }, 5000); 
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