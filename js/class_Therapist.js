import {Visit} from "/js/class_Visit.js"
import {VisitCardiologist} from "./class_Cardio.js";
import {VisitDentist} from "./class_Dentist.js";

export class VisitTherapist extends Visit {
    constructor(id, urgencyOfVisit, doctor, visitStatus, nameDoctor, date, nameUser, purpose, description, age, pressure, bodyIndex, diseases) {
        super(id, urgencyOfVisit, doctor, visitStatus, nameDoctor, date, nameUser, purpose, description);
        this.age = age
    }

    async createTherapist(token) {
        const therapist = {
            urgencyOfVisit: this.urgencyOfVisit,
            doctor: this.doctor,
            visitStatus: this.visitStatus,
            nameDoctor: this.nameDoctor,
            date: this.date,
            purpose: this.purpose,
            nameUser: this.nameUser,
            age: this.age,
            description: this.description
        }

        const response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(therapist)
        })
        const result = await response.json()
        if (result) {
            const title = document.querySelector(".visit__title")
            title.style.display = "none"
        }
        return result
    }

    async createTherapistForm() {
        const ModalFormContent = document.querySelector('.form__content');

        const form = document.createElement("form")
        form.classList.add("form__create-information")

        const select = document.createElement("select")
        select.classList.add("urgency-select", "urgency")
        select.name = "urgencyOfVisit"
        select.setAttribute("required", "required")

        const option = document.createElement("option")
        option.textContent = "Urgency of visit"

        const optionOrdinary = document.createElement("option")
        optionOrdinary.value = "Ordinary"
        optionOrdinary.textContent = "Ordinary"

        const optionPriority = document.createElement("option")
        optionPriority.value = "Priority"
        optionPriority.textContent = "Priority"

        const optionUrgent = document.createElement("option")
        optionUrgent.value = "Urgent"
        optionUrgent.textContent = "Urgent"

        select.append(option, optionOrdinary, optionPriority, optionUrgent)

        const selectStatus = document.createElement('select')
        selectStatus.classList.add("visit-status")
        selectStatus.name = "visitStatus"
        selectStatus.setAttribute("required", "required")

        const optionSelect = document.createElement("option")
        optionSelect.textContent = "Choose visit status"

        const optionOpen = document.createElement("option")
        optionOpen.value = "open"
        optionOpen.textContent = "Open"

        const optionClosed = document.createElement("option")
        optionClosed.value = "closed"
        optionClosed.textContent = "Closed"

        selectStatus.append(optionSelect, optionOpen, optionClosed)

        const inputDoctor = document.createElement("input")
        inputDoctor.value = 'Therapist'
        inputDoctor.classList.add("doctor")
        inputDoctor.name = "doctor"

        const inputNameDoctor = document.createElement("input")
        inputNameDoctor.classList.add("name-doctor")
        inputNameDoctor.name = "nameDoctor"
        inputNameDoctor.placeholder = "Your doctor's full name"
        inputNameDoctor.setAttribute("required", "required")

        const inputDate = document.createElement("input")
        const labelDate = document.createElement("label")
        labelDate.textContent = "Date of visit"
        inputDate.classList.add("date")
        inputDate.name = "date"
        inputDate.placeholder = "Date of visit"
        inputDate.type = "date"
        inputDate.setAttribute("required", "required")

        const inputPurpose = document.createElement("input")
        inputPurpose.classList.add("purpose")
        inputPurpose.name = "purpose"
        inputPurpose.placeholder = "Purpose of the visit"
        inputPurpose.setAttribute("required", "required")

        const inputNameUser = document.createElement("input")
        inputNameUser.classList.add("nameUser")
        inputNameUser.name = "nameUser"
        inputNameUser.placeholder = "Enter your full name"
        inputNameUser.setAttribute("required", "required")

        const inputAge = document.createElement("input")
        inputAge.classList.add("age")
        inputAge.name = "age"
        inputAge.placeholder = "Age"
        inputAge.type = "number"
        inputAge.setAttribute("required", "required")

        const textarea = document.createElement("textarea")
        textarea.classList.add("description")
        textarea.name = "description"
        textarea.placeholder = "Description of the visit"

        const btn = document.createElement("button")
        btn.classList.add("form__add")
        btn.textContent = "Add"

        form.append(select, inputDoctor, labelDate, inputDate, selectStatus, inputNameDoctor, inputPurpose, inputNameUser, inputAge, textarea, btn)

        ModalFormContent.insertAdjacentElement('beforeend', form)
        document.querySelector(".form__create-information").addEventListener("submit", async (event) => {
            event.preventDefault()

            this.urgencyOfVisit = event.target.elements.urgencyOfVisit.value
            this.doctor = event.target.elements.doctor.value
            this.visitStatus = event.target.elements.visitStatus.value
            this.nameDoctor = event.target.elements.nameDoctor.value
            this.date = event.target.elements.date.value
            this.purpose = event.target.elements.purpose.value
            this.nameUser = event.target.elements.nameUser.value
            this.age = event.target.elements.age.value
            this.description = event.target.elements.description.value

            const visit = await this.createTherapist(`${localStorage.getItem("token")}`)
            this.id = visit.id

            document.querySelector('.section__form').style.display = "none"
            this.renderTherapistCard(this)
            await this.deleteCard()

            form.remove()
            const select = document.createElement("select")
            select.classList.add("form-select")
            const array = ['Choose the doctor', "Cardiologist", "Dentist", "Therapist"]
            for (let i = 0; i <= array.length - 1; i++) {
                let opt = document.createElement('option');
                opt.innerHTML = array[i];
                select.appendChild(opt);
            }
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
            document.querySelector(".form__content").append(select)
        })
    }

    renderTherapistCard(item) {

        const visitCards = document.querySelector(".visit__cards")

        const templateCard = `
                          <li class="cards__content cards__${item.id}">
                            <i id = "${item.id}test" class="fa-solid fa-trash-can" data-id = ${item.id}></i>
                            <img class="cards__img" src="../img/therapast.png" alt="doctor">
                            <div class="cards__information">
                              <p class="cards__date">${item.date}, ${item.urgencyOfVisit} </p>
                              <h2 class="cards__doctor">${item.doctor}</h2>
                              <h3 class="cards__name">${item.nameDoctor}</h3>
                            </div>
                            <div class="cards__btn">
                              <button id = "${item.id}edit" data-id = ${item.id} type="button" class="cards__btn-edit" >Edit</button>
                              <button  id = "${item.id}showMore" data-id = ${item.id} type="button" class="cards__btn-more">Show more</button>
                            </div>
                            <div class="cards__more-information">
                                <ol class="list-group list-group-numbered card__${item.id}" style="display: none;">
                                     <li data-id = ${item.id} class="list-group-item"> <span>Visit status: </span>${item.visitStatus}</li>
                                     <li data-id = ${item.id} class="list-group-item"> <span>Your full name: </span>${item.nameUser}</li>
                                     <li data-id = ${item.id} class="list-group-item"> <span>Your age: </span>${item.age}</li>
                                     <li data-id = ${item.id} class="list-group-item"><span>Purpose of the visit: </span> ${item.purpose}</li>
                                     <li data-id = ${item.id} class="list-group-item"><span>Description of the visit: </span>${item.description}</li>
                                </ol>
                            </div>
                          </li>
                       `
        visitCards.insertAdjacentHTML("beforeend", templateCard)
        const btnMore = document.getElementById(`${item.id}showMore`)
        btnMore.onclick = function click(event) {
            const group = event.target.parentNode.parentNode.querySelector('.list-group')
            if (group.style.display === "none") {
                group.style.display = "block";
                btnMore.textContent = 'Show less'

            } else {
                group.style.display = "none";
                btnMore.textContent = 'Show more'
            }
        }
        document.getElementById(`${this.id}test`).addEventListener("click", this.deleteCard)
        return visitCards
    }

    render() {
        this.createTherapistForm(`${localStorage.getItem("token")}`)
    }
}





