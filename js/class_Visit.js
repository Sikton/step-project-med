export class Visit {
    constructor(id, urgencyOfVisit, doctor, visitStatus, nameDoctor, date, nameUser, purpose, description) {
        this.urgencyOfVisit = urgencyOfVisit;
        this.id = id;
        this.doctor = doctor;
        this.visitStatus = visitStatus;
        this.nameDoctor = nameDoctor;
        this.date = date;
        this.nameUser = nameUser;
        this.purpose = purpose;
        this.description = description;
    }

    async deleteCard(event) {
        if (!event) return
        await fetch(`https://ajax.test-danit.com/api/v2/cards/${event.target.dataset.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
        }).then((response) => {

            event.target.parentNode.remove()

        });
    }
}