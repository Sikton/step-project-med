import {VisitCardiologist} from "./class_Cardio.js";
import {VisitDentist} from "./class_Dentist.js";
import {VisitTherapist} from "./class_Therapist.js";


const select = document.querySelector(".form-select")
select.addEventListener('change', (event) => {

    if (event.target.value === "Cardiologist") {
        select.remove()
        const cardio = new VisitCardiologist()
        cardio.render()
    } else if (event.target.value === "Dentist") {
        select.remove()
        const dentist = new VisitDentist()
        dentist.render()
    } else if (event.target.value === "Therapist") {
        select.remove()
        const therapist = new VisitTherapist()
        therapist.render()
    }
});





