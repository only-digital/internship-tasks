import Component from '../../app/js/base/Component';

class Form extends Component {
    constructor(element) {
        super(element);

        // Your code here
        const button = this.getElement('.form__content__button');
        button.addEventListener('click', async () => {
          const email = this.getElement('.form__content__input').value;
          const confirm = this.getElement('.form__content__contaier__input').checked;
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
              this.getElement('.message').textContent = 'Отправлено';
              this.getElement('.message').style.color = 'green';
            } else {
              this.getElement('.message').textContent = 'Ошибка';
              this.getElement('.message').style.color = 'red'; 
            }
          } catch (error) {
            console.error('Ошибка получения данных(form)', error);
          }
        });
    


        
    }

    // Your code here
}

export default Form