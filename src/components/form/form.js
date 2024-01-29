import Component from '../../app/js/base/Component';

class Form extends Component {
    constructor(element) {
        super(element);

        // Your code here
        document.addEventListener('DOMContentLoaded', function() {
            document.getElementsByClassName('form__content__button').addEventListener('click', async () => {
                const email = document.getElementsByClassName('form__content__input').value;
                const confirm = document.getElementsByClassName('form__content__contaier__input').checked;
                const data = { 
                    email: email,
                    confirm: confirm,
                };
                try {
                    const response = await fetch('/form.json', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });
                    if (response.ok) {
                        document.getElementsByClassName('message').textContent = 'Отправлено';
                        document.getElementsByClassName('message').style.color = 'green';
                    } else {
                        document.getElementsByClassName('message').textContent = 'Ошибка';
                        document.getElementsByClassName('message').style.color = 'red';
                    }
                } catch (error) {
                    console.error('Ощибка получения данных(form)', error);
                }
            });
        });
  
          


        
    }

    // Your code here
}

export default Form