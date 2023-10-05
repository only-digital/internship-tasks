import Component from '../../app/js/base/component';

class Accordeon extends Component {
    constructor(element) {
        super(element);

        // Your code here
        this.root.addEventListener('click', (e) => this.onClick(e));
    }

    // Your code here
    onClick(e) {
        const target = e.target;

        if (target.classList.contains('accordeon__item')) {
            const text = target.querySelector('.accordeon__text');

            if (target.querySelector('.accordeon__btn').classList.contains('rotate')) {
                target.querySelector('.accordeon__title').classList.remove('blue');
                target.querySelector('.accordeon__btn').classList.remove('rotate');
                text.style.maxHeight = 0 + 'px';
                text.style.marginTop = 0 + 'px';
            } else {
                target.querySelector('.accordeon__title').classList.add('blue');
                target.querySelector('.accordeon__btn').classList.add('rotate');
                text.style.maxHeight = text.scrollHeight + 'px';
                text.style.marginTop = 30 + 'px';
            }
        }

        if (target.classList.contains('accordeon__title')) {
            const text = target.parentElement.parentElement.querySelector('.accordeon__text');

            if (target.classList.contains('blue')) {
                target.classList.remove('blue');
                target.nextElementSibling.classList.remove('rotate');
                text.style.maxHeight = 0 + 'px';
                text.style.marginTop = 0 + 'px';
            } else {
                target.classList.add('blue');
                target.nextElementSibling.classList.add('rotate');
                text.style.maxHeight = text.scrollHeight + 'px';
                text.style.marginTop = 30 + 'px';
            }
        }

        if (target.classList.contains('accordeon__text')) {
            target.parentElement.querySelector('.accordeon__title').classList.remove('blue');
            target.parentElement.querySelector('.accordeon__btn').classList.remove('rotate');
            target.style.maxHeight = 0 + 'px';
            target.style.marginTop = 0 + 'px';
        }

        if (target.classList.contains('accordeon__header')) {
            const text = target.parentElement.querySelector('.accordeon__text');

            if (target.firstElementChild.classList.contains('blue')) {
                target.firstElementChild.classList.remove('blue');
                target.lastElementChild.classList.remove('rotate');
                text.style.maxHeight = 0 + 'px';
                text.style.marginTop = 0 + 'px';
            } else {
                target.firstElementChild.classList.add('blue');
                target.lastElementChild.classList.add('rotate');
                text.style.maxHeight = text.scrollHeight + 'px';
                text.style.marginTop = 30 + 'px';
            }
        }

        if (target.nodeName === 'IMG') {
            const text = target.parentElement.parentElement.parentElement.querySelector('.accordeon__text');

            if (target.parentElement.classList.contains('rotate')) {
                target.parentElement.classList.remove('rotate');
                target.parentElement.previousElementSibling.classList.remove('blue');
                text.style.maxHeight = 0 + 'px';
                text.style.marginTop = 0 + 'px';
            } else {
                target.parentElement.classList.add('rotate');
                target.parentElement.previousElementSibling.classList.add('blue');
                text.style.maxHeight = text.scrollHeight + 'px';
                text.style.marginTop = 30 + 'px';
            }
        }

        if (target.nodeName === 'BUTTON') {
            const text = target.parentElement.parentElement.querySelector('.accordeon__text');

            if (target.classList.contains('rotate')) {
                target.classList.remove('rotate');
                target.parentElement.classList.remove('blue');
                text.style.maxHeight = 0 + 'px';
                text.style.marginTop = 0 + 'px';
            } else {
                target.classList.add('rotate');
                target.parentElement.classList.add('blue');
                text.style.maxHeight = text.scrollHeight + 'px';
                text.style.marginTop = 30 + 'px';
            }
        }
    }
}

export default Accordeon