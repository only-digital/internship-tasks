import Component from '../../app/js/base/component';

class FeedbackForm extends Component {
    form;
    input;
    checkbox;
    error;
    submitBtn;
    okFormElement;
    loader;

    constructor(element) {
        super(element);

        this.form = this.root;
        this.input = this.root.querySelector('.feedback-form__input');
        this.checkbox = this.root.querySelector('.feedback-form__hidden-checkbox');
        this.error = this.root.querySelector('.feedback-form__error');

        this.form.addEventListener('submit', this.onSubmit);
        this.input.addEventListener('focus', this.hiddenError);

        this.submitBtn = this.root.querySelector('button');
        this.okFormElement = this.root.querySelector('.feedback-form__after-submit');
        this.loader = this.root.querySelector('.feedback-form__loader')
    }

    submitQuery = async (email, checked) => {
        const res = await fetch('/form', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ email, confirm: checked }),
        })

        const resJson = await res.json();

        if (res.ok) {
            return resJson;
        }

        return Promise.reject(resJson.message);
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const email = this.input.value;
        const checked = this.checkbox.checked;

        this.loader.classList.add('feedback-form__loader_show');
        this.submitBtn.classList.add('feedback-form__submit-btn_hidden');

        this.submitQuery(email, checked)
            .then(() => {
                this.submitBtn.parentNode.removeChild(this.submitBtn);
                this.okFormElement.classList.add('feedback-form__after-submit_show');
                this.form
                    .querySelector('.feedback-form__opacity-container')
                    .classList.add('feedback-form__opacity-container_show');
            })
            .catch((err) => this.error.textContent = err)
            .finally(() => {
                this.loader.classList.remove('feedback-form__loader_show');
                this.submitBtn.classList.remove('feedback-form__submit-btn_hidden');
            });
    }

    hiddenError = () => {
        this.error.textContent = '';
    }
}

export default FeedbackForm