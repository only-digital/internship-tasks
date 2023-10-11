import Component from '../../app/js/base/component';

class VacTitle extends Component {

    views;
    responses;
    loader;


    constructor(element) {
        super(element);

        this.views = this.getElement('stats-views')
        this.responses = this.getElement('stats-responses')
        this.loader = this.getElement('loader')
        this.getDate('/stats').then(data => {

            this.loader.classList.remove('active')

            this.views.textContent = `Просмотров: ${data.views}`
            this.responses.textContent = `Откликов: ${data.responses}`
        })
    }

    async getDate(url) {
        this.loader.classList.add('active')

        return await fetch(url, {
            method: "GET"
        })
            .then(res => res.json())
            .catch(error => console.error(error))
    }


}

export default VacTitle