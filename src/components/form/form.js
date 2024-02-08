import Component from '../../app/js/base/Component';

class Form extends Component {
    constructor(element) {
        super(element);

        // Your code here
        const button = document.querySelector('.form__content__button');
        button.addEventListener('click', async (event) => {
          event.preventDefault();
          const email = document.querySelector('.form__content__input').value;
          const confirm = document.querySelector('.form__content__contaier__input').checked;
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
              document.querySelector('.form__content__contaier__message').textContent = 'Отправлено';
              document.querySelector('.form__content__contaier__message').style.color = 'green';
            } else {
              document.querySelector('.form__content__contaier__message').textContent = 'Ошибка';
              document.querySelector('.form__content__contaier__message').style.color = 'red'; 
            }
          } catch (error) {
            console.error('Ошибка получения данных(form)', error);
          }
        });
    


     
    }

    // Your code here

    
}

export default Form