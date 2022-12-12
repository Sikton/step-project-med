export class ModalForm{
    constructor() {
        this.modalForm = document.querySelector('.section__form');
        this.closemodalForm = document.querySelector('.form__close-modal');
        this.selectFormDoctor = document.querySelector('.form-select__doctor')
        this.selectFormUrgency = document.querySelector('.form-select__doctor')
        this.createVisit = document.querySelector('.create-visit');

    }

    getModalForm(){
         this.createVisit.addEventListener('click', (event) => {
            this.modalForm.style.display = "block"
         })
        window.addEventListener('click', (e) => {
            if (e.target === this.modalForm || e.target === this.closemodalForm) {
                this.modalForm.style.display = "none"
            }
        })

    }

    close(){
        this.modalForm.style.display = "none"

    }

    render(){
        this.getModalForm()
    }
}

const form = new ModalForm ();
form.render()




