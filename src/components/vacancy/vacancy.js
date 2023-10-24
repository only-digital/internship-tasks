import Component from '../../app/js/base/component';

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
    switch (res) {
        case 'none':
            this.status.textContent = 'Поле E-mail обязательно';
            break;
        case 'email':
            this.status.textContent = 'Некорректный E-mail';
            break;
        case 'confirm':
            this.status.textContent = 'Необходимо подтвердить согласие с обработкой персональных данных';
            break;
        case 'restart':
            if (!this.status.classList.contains('hidden')) this.status.classList.add('hidden');
            return true;
        default:
            this.status.textContent = '';
            return false;
    }
    
    this.status.classList.toggle('hidden');
    return false;
}

dataValidation = (check) => {
    if (check.email === '')  return this.showValidationResult('none');
    
    const emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    if (!emailRegexp.test(check.email)) return this.showValidationResult('email');

    if (!check.confirm) return this.showValidationResult('confirm');
    
    return true; // Data is valid
}

postRequestStatus = (status, msg) => {
    this.loader.classList.toggle('hidden');

    if (status === 'error') {
        if (this.dataValidation(msg)) //если ошибка не в данных
        {
            this.status.textContent = 'Ошибка не сервере. Попробуйте еще раз';
            this.status.classList.toggle('hidden');
        }
    } else if (status === 'ok') {
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
    .then(response => response.json())
    .then(data => this.parseData(data))
    .catch(error => {
        console.error(error);
    })
}
}

export default Vacancy