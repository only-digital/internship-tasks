import Component from '../../app/js/base/component';

class FormRequest extends Component {
    constructor(element) {
        super(element);
        // Header
        this.views = document.querySelector('.form-request__header-views');
        this.responses = document.querySelector('.form-request__header-responses');
        this.info = document.querySelector('.form-request__header-info');
        this.loading = document.querySelector('.form-request__header-loading');
        this.getResource('/stats').then(res => this.loadInfo(res));

        // Form
        this.form = document.querySelector('.form-request__form');
        this.form.addEventListener('submit', (e) => this.submitForm(e));
        this.email = document.querySelector('.form-request__form-email');
        this.text = document.querySelector('.form-request__form-text');
        this.checkbox = document.querySelector('.form-request__form-checkbox-real');
        this.label = document.querySelector('.form-request__form-checkbox');
        this.spinner = document.querySelector('.form-request__form-spinner');
        this.button = document.querySelector('.form-request__form-btn');
        this.success = document.querySelector('.form-request__form-success');
        this.error = document.querySelector('.form-request__form-error');
    }

    getResource = async (url) => {
        this.loading.style.display = 'block';


        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    };

    loadInfo(data) {
        this.views.textContent = data.views;
        this.responses.textContent = data.responses;
        this.loading.style.display = 'none';
        this.info.style.opacity = '1';
    }
    

    submitForm(e) {
        e.preventDefault();

        const data = {
            email: this.email.value,
            confirm: this.checkbox.checked
        }

        if (data.email === '') {
            this.error.textContent = 'Поле E-mail обязательно';
        }

        if (data.confirm === false) {
            this.error.textContent = 'Необходимо подтвердить согласие с правилами';
        }

        if (data.confirm === false && data.email === '') {
            this.error.textContent = 'Поле E-mail обязательно. Необходимо подтвердить согласие с правилами';
        }

        this.postData('/form', JSON.stringify(data));
    }

    showItems() {
        this.button.disabled = false;
        this.email.disabled = false;
        this.text.style.opacity = '1';
        this.label.classList.remove('hide');
        this.spinner.style.display = 'none';
        this.error.style.color = '#EF1C1C';
    }

    hideItems() {
        this.spinner.style.display = 'block';
        this.error.style.color = 'transparent';
        this.button.disabled = true;
        this.email.disabled = true;
        this.text.style.opacity = '.3';
        this.label.classList.add('hide');
    }

    postData = async (url, data) => {
        this.hideItems();

        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        if (res.status === 200) {
            this.spinner.style.display = 'none';
            this.button.style.opacity = '0';
            this.success.style.opacity = '1';
        } 

        if (res.status === 422) {
            this.showItems();
        }
     
        return await res.json();
    };
}

export default FormRequest