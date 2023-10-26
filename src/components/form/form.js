import Component from '../../app/js/base/Component';

class Form extends Component {

    form;
    labelEmail;
    inputEmail;
    labelTextarea;
    inputTextarea;

    pEmailError;
    pTextareaError;
    pFileError;

    labelFile;
    inputFile;  
    inputCheckbox;
    submitButton;

    attachButton;

    formState; 
    maxSize;
    regExp = /^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/

    filesArr = [];

    // itemIcon;

    
    constructor(element) {
        super(element);
        // Your code here
        this.maxSize = (1024 * 1024) * 5 //не более 5 мб

        this.formState = {
            email: false,
            textarea: false,
            files: true,
            checkbox: false
        }

        this.form = document.querySelector('.form');

        this.labelEmail = document.querySelector('.form__email-label');
        this.inputEmail = document.querySelector('.form__email');;
        this.pEmailError = document.querySelector('.form__email-error');

        this.labelTextarea = document.querySelector('.form__textarea-label');
        this.inputTextarea = document.querySelector('.form__textarea');
        this.pTextareaError = document.querySelector('.form__textarea-error');

        this.formFile = document.querySelector('.form__file');
        this.attachButton = document.querySelector('.form__file-button');

        this.labelFile = document.querySelector('.form__file-label');
        this.inputFile = document.querySelector('.form__file-input');
        this.pFileError = document.querySelector('.form__file-error');

        this.inputCheckbox = document.querySelector('.form__checkbox-input');
        this.submitButton = document.querySelector('.form__button-submit');

        this.downloadedFiles = document.querySelector('.form__file-downloaded');

        // this.itemIcon = document.querySelector('.form__file-close'); //
   
        //blur- потеря фокуса       focus- фокус

        this.inputEmail.addEventListener('blur', this.onCheckEmail);
        this.inputEmail.addEventListener('focus', this.onFocusEmail);

        this.inputTextarea.addEventListener('blur', this.onCheckMessage);
        this.inputTextarea.addEventListener('focus', this.onFocusTextarea);

        this.inputFile.addEventListener('change', this.onChangeFile);
        this.inputCheckbox.addEventListener('click', this.onChecked);
        this.form.addEventListener('submit', this.onSubmit);

        this.inputFile.addEventListener('blur', this.onActiveAttachButton);

        // this.itemIcon.addEventListener('click', this.deleteElement); //

        
        
    }
        onCheckEmail = (e) => {
            const email = e.target.value;
            
            const isValidEmail = this.regExp.test(email);
            console.log(email);

            if(!isValidEmail){
                this.labelEmail.classList.add('block'); //
                this.inputEmail.classList.add('invalid');
                
                this.inputEmail.classList.remove('valid');
                this.pEmailError.textContent = 'Введите email';
                this.formState.email = false;
                this.formValidate();
    
            } else {
               
                this.inputEmail.classList.remove('invalid');
                this.labelEmail.classList.add('block'); //
                this.inputEmail.classList.add('valid');
                this.formState.email = true;
                this.formValidate();
            }
        }

        onFocusEmail = () => {
            this.pEmailError.textContent = '';
            this.labelEmail.classList.add('block');
        }


        onCheckMessage = (e) => {
            const message = e.target.value.trim();
        
            switch (true) {
                case (message.length === 0):
                    this.setMessageError('Сообщение не может быть пустым');
                    break;
                case (message.length > 1000):
                    this.setMessageError('Сообщение не может содержать больше 1000 символов');
                    break;
                default:
                    this.removeMessageError();
            }
            this.formValidate()
        }
        
        setMessageError = (errorText) =>{
            this.labelTextarea.classList.add('block');
            this.inputTextarea.classList.add('invalid');            
            this.inputTextarea.classList.remove('valid');
            this.pTextareaError.textContent = errorText;
            this.formState.textarea = false;
        }
        
        removeMessageError = () => {          
            this.inputTextarea.classList.remove('invalid');
            this.labelTextarea.classList.add('block');
            this.inputTextarea.classList.add('valid');
            this.formState.textarea = true;
        }


        onFocusTextarea = () => {
            this.pTextareaError.textContent = '';
            this.labelTextarea.classList.add('block');
        }

        formValidate() {
            for (let key in this.formState) {
              if (!this.formState[key]) { // Если поле не прошло валидацию
                this.submitButton.disabled = true; // Отключаем кнопку отправки формы
                break; // Прекращаем проверку остальных полей
              } else {
                this.submitButton.disabled = false; // Включаем кнопку отправки формы
              }
            }
        }

        onChecked = (e) => {
            this.formState.checkbox = e.target.checked;
            this.formValidate();
        }


        onChangeFile = (e) => {
            
            const file = e.target.files;  //только 1 файл попадает
            console.log(this.filesArr.length)
            if(this.filesArr.length >= 2) { 
                this.pFileError.textContent = 'Вы можете загрузить только 2 элемента';
                this.formValidate();  
            } else {
                this.pFileError.textContent = '';
                this.createElement(file);  
            }
        }

        createElement = (files) => {
            console.log(files) //FileList из 1 элемента
                    
            for (const file of files) {   //получаем файл из FileList
                this.filesArr.push(file);  //добавляем файл в массив
                
                if (file.size >= this.maxSize) {
                    this.pFileError.textContent = 'Максимальный размер файла 5 MB';                   
                    this.formState.files = false;
    
                } else {
                    // console.log(file);
                    const item = document.createElement('div');
                    const itemIcon = document.createElement('div');//
                    item.classList.add('form__file-downloaded');
                    itemIcon.classList.add('form__file-close'); //
                    item.textContent = `${file.name}, ${Math.ceil(file.size/1024)} kB`;
                    this.formFile.appendChild(item);
                    item.appendChild(itemIcon); //                       
                    this.formState.files = true;

                    itemIcon.addEventListener('click', this.deleteElement); //
                    
                }

                this.formValidate();
            }
        }


        deleteElement = (e) => {          
            const parentNode = e.target.parentNode;  //div.form__file-downloaded                   
            const parentNodeName = e.target.parentNode.innerText.split(',')[0]; //doc.docx

            this.filesArr = this.filesArr.filter(el => {
                return el.name !== parentNodeName;
            });

            parentNode.remove();
            this.pFileError.textContent = '';
                
        }
        
        onActiveAttachButton = () => {
            if (this.formState.email && this.formState.textarea || this.formState.files) {               
                this.attachButton.classList.add('valid');
            } else {
                this.attachButton.classList.remove('valid');
            }
        }


        onSubmit = (e) => {
            e.preventDefault();

            this.formValidate();

            const success = document.querySelector('.form__success-submit');
            const form = e.target;

            const loadedFiles = document.querySelectorAll('.form__file-downloaded');

            if(!this.submitButton.disabled){
                fetch('/form', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: this.inputEmail.value,
                        confirm: this.inputCheckbox.checked,
                        files: this.filesArr,  
                        textarea: this.inputTextarea.value
                    }),
                    headers: {
                        'content-type': 'application/json',
                    }
                }).then(res => {

                    if (res.status === 200) {

                        setTimeout(() => {                             
                            this.submitButton.disabled = true;
                            success.style.display = 'flex';
                            this.inputTextarea.classList.remove('valid');
                            this.inputEmail.classList.remove('valid');
                            this.labelEmail.classList.remove('block');
                            this.labelTextarea.classList.remove('block');
                            this.attachButton.classList.remove('valid');
                            this.pFileError.textContent = '';
                            this.filesArr = [];

                            loadedFiles.forEach(el => {
                                el.remove();
                            });

                            form.reset();
                           
                        }, 3000)
                        
                        setTimeout(() => {                             

                            success.style.display = 'none';
                           
                        }, 8000)
                    }
                }).catch(error => {
                    console.error(error)
                })
            }
        }

        

}   


    
export default Form