import Component from '../../app/js/base/Component';

class Form extends Component {
    constructor(element) {
        super(element);

        // Your code here
        const button = this.getElement('content__button');
        const clickForm = async (event) => {
            event.preventDefault();

            button.removeEventListener('click', clickForm);

            const email = document.querySelector('.form__content__input').value;
            const confirm = document.querySelector('.form__content__container__input').checked;
            const data = { 
                email: email,
                confirm: confirm,
            };
        
            console.log(data);
        
            try {
                const response = await fetch('/form', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
        
                if (response.ok) {
                    document.querySelector('.form__content__container__message').textContent = 'Отправлено';
                    document.querySelector('.form__content__container__message').classList.add('green');
                } else {
                    document.querySelector('.form__content__container__message').textContent = 'Ошибка';
                    document.querySelector('.form__content__container__message').classList.add('red');
                }
            } catch (error) {
                console.error('Ошибка получения данных(form)', error);
            }
        };
        
        button.addEventListener('click', clickForm);
     
    }

    // Your code here

    
}

export default Form