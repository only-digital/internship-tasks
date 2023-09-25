import Component from "../../app/js/base/Component";

class Spoiler extends Component {
  constructor(element) {
    super(element);
    this.root.addEventListener("click", this.onButtonClick);
  }

  onButtonClick = (event) => {
    const btn = event.target;
    const atribute = btn.getAttribute("data-row");
    if (!atribute) {
      return;
    }

    const height = btn.nextElementSibling.scrollHeight;   

    if(btn.nextElementSibling.classList.contains("active")){
      btn.nextElementSibling.style.height = '0px';
    } else{
      btn.nextElementSibling.style.height = `${height}px`;
    }   

    btn.nextElementSibling.classList.toggle("active");
    btn.previousElementSibling.classList.toggle("active"); 
    btn.classList.toggle("active");
  };
}

export default Spoiler;
