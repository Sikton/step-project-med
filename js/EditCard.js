import { ModalForm } from './classModalForm.js';

class EditCard {
  constructor() {
    this.createVisit = document.querySelector('.create-visit');
    this.sectionForm = document.querySelector('.section__form');
    this.formCloseModal = document.querySelector('.form__close-modal');
    this.formContent = document.querySelector('.form__content');
    this.formContentTittle = document.querySelector('.form__content-tittle');
    this.formSelect = document.querySelector('.form-select');
  }

  createForm(card) {
    if (document.querySelector('.form-select')) {
      document.querySelector('.form-select').style.display = 'none';
    }
    const sectionForm = document.querySelector('.section__form');
    sectionForm.style.display = 'block';
    const formContentTittle = document.querySelector('.form__content-tittle');
    formContentTittle.innerHTML = 'Edit Card';
    const formContent = document.querySelector('.form__content');

    formContent.insertAdjacentHTML(
      'beforeend',
      `
      <form class="form__create-information">
      <select
        class="urgency-select urgency"
        name="urgencyOfVisit"
        required="required"
        value="${card.urgencyOfVisit}"
      >
        <option>Urgency of visit</option>
        <option value="Ordinary">Ordinary</option>
        <option value="Priority">Priority</option>
        <option value="Urgent">Urgent</option></select
      >
      <input
        class="doctor"
        name="doctor"
        placeholder="Your doctor's full name"
        required="required"
        value="${card.doctor}" />
      <select
        class="visit-status"
        name="visitStatus"
        required="required"
      >
        <option>Choose visit status</option>
        <option value="open">Open</option>
        <option value="closed">Closed</option></select
      >
      <input
        class="name-doctor"
        name="nameDoctor"
        placeholder="Your doctor's full name"
        required="required"
        value="${card.nameDoctor}"
      />
      <input
        class="purpose"
        name="purpose"
        placeholder="Purpose of the visit"
        required="required"
        value="${card.purpose}"
      />
       <input
        class="nameUser"
        name="nameUser"
        placeholder="Enter your full name"
        required="required"
        value="${card.nameUser}"
      />

      <label>Date of visit</label
      >
      <input
        class="date"
        name="date"
        placeholder="Date of visit:"
        type="date"
        required="required"
        value="${card.date}"
      />



    </form>
      `
    );

    this.saveEditCard(card.id);
  }

  saveEditCard(id) {
    const formElement = document.querySelector('.form__create-information');
    formElement.addEventListener('submit', (e) => {
      e.preventDefault();

      const urgentsy = document.querySelector('.urgency-select').value;
      const visitStatus = document.querySelector('.visit-status').value;
      //   const doctor = document.querySelector('.select__doctor').value;

      const formData = new FormData(formElement);
      const doctor = formData.get('doctor');
      const nameDoctor = formData.get('nameDoctor');
      const date = formData.get('date');
      const purpose = formData.get('purpose');
      const nameUser = formData.get('nameUser');
      const age = formData.get('age');
      const pressure = formData.get('pressure');
      const bodyIndex = formData.get('bodyIndex');
      const diseases = formData.get('diseases');
      const description = formData.get('description');
      const lastVisit = formData.get('lastVisit');

      const token = '825217a0-e755-483d-bfea-a9067600a2f3';
      this.creater(
        id,
        doctor,
        token,
        urgentsy,
        nameDoctor,
        date,
        purpose,
        nameUser,
        age,
        pressure,
        bodyIndex,
        diseases,
        description,
        visitStatus,
        lastVisit
      );
      formElement.remove();
      this.sectionForm.style.cssText = '';
    });
  }

  creater(
    id,
    doctor,
    token,
    urgentsy,
    nameDoctor,
    date,
    purpose,
    nameUser,
    age,
    pressure,
    bodyIndex,
    diseases,
    description,
    visitStatus,
    lastVisit
  ) {
    fetch('https://ajax.test-danit.com/api/v2/cards/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: id,
        doctor: doctor,
        nameUser: nameUser,
        nameDoctor: nameDoctor,
        urgencyOfVisit: urgentsy,
        description: description,
        pressure: pressure,
        purpose: purpose,
        bodyIndex: bodyIndex,
        diseases: diseases,
        date: date,
        age: age,
        visitStatus: visitStatus,
        lastVisit: lastVisit,
      }),
    })
      .then((response) => response.json())
      .then((response) => console.log(response));
  }

  createModalForm() {
    this.createVisit.addEventListener('click', () => {
      const modalForm = new ModalForm();
      modalForm.render();
    });
  }

  render(card) {
    this.createModalForm();
    this.createForm(card);
  }
}

export default EditCard;
