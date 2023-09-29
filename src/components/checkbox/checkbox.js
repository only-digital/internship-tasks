import Component from '../../app/js/base/Component';

class Checkbox extends Component {
	link;
    constructor(element) {
        super(element);

		  this.link = this.root.querySelector("a");

		  this.link.addEventListener("click", this.onClickHandler);
		}

		onClickHandler = (e) => {
			console.log(this.root.getAttribute("checked"))
			this.root.setAttribute("checked", "");
		}
}
export default Checkbox

