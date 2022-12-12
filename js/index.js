import Modal from './components/Modal.js';
import { VisitCardiologist } from './class_Cardio.js';
import { VisitDentist } from './class_Dentist.js';
import { VisitTherapist } from './class_Therapist.js';
import EditCardButton from './EditCardButton.js';

const loginModal = new Modal();
loginModal.render();

const editCardButton = new EditCardButton();
editCardButton.render();

function checkAuthorization() {
  const token = '825217a0-e755-483d-bfea-a9067600a2f3';
  if (localStorage.getItem('token') === token) {
    getAllCards(token);
  }
}

checkAuthorization();

export function getAllCards(token) {
  fetch('https://ajax.test-danit.com/api/v2/cards', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((response) => {
      const title = document.querySelector('.visit__title');
      if (response.length) {
        title.style.display = 'none';
      }

      console.log(response);
      for (const item of response) {
        if (item.doctor === 'Cardiologist') {
          const visit = new VisitCardiologist(
            item.id,
            item.urgencyOfVisit,
            item.doctor,
            item.visitStatus,
            item.nameDoctor,
            item.date,
            item.nameUser,
            item.purpose,
            item.description,
            item.age,
            item.pressure,
            item.bodyIndex,
            item.diseases
          );
          visit.renderCardioCard(item);
        }

        if (item.doctor === 'Dentist') {
          const visit = new VisitDentist(
            item.id,
            item.urgencyOfVisit,
            item.doctor,
            item.visitStatus,
            item.nameDoctor,
            item.date,
            item.nameUser,
            item.purpose,
            item.description,
            item.lastVisit
          );
          visit.renderDentistCard(item);
        }

        if (item.doctor === 'Therapist') {
          const visit = new VisitTherapist(
            item.id,
            item.urgencyOfVisit,
            item.doctor,
            item.visitStatus,
            item.nameDoctor,
            item.date,
            item.nameUser,
            item.purpose,
            item.description,
            item.age
          );
          visit.renderTherapistCard(item);
        }
      }
    });
}
