import Component from '../../app/js/base/component';

class VacancyHeader extends Component {
    views;
    responses;

    constructor(element) {
        super(element);

        // Your code here
        this.views = this.getElement("views")
        this.responses = this.getElement("responses")
        this.getData()
    }

    // Your code here
    async getData() {
        try {
            this.doLoader(true)
            const res = await fetch('/stats')
            const data = await res.json()
            this.setData({views: data.views, responses: data.responses})
        } catch (e) {
            console.log(e)
            this.setData({views: "нет данных", responses: "нет данных"})
        } finally {
            this.doLoader(false)
        }
    }

    doLoader(bool) {
        if( bool ) 
            this.root.classList.add('loading') 
        else 
            this.root.classList.remove('loading')
    }

    setData(data) {
        this.views.textContent = `Просмотров: ${data.views}`
        this.responses.textContent = `Откликов: ${data.responses}`
    }
    
}

export default VacancyHeader