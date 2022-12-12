import { token } from './components/token.js';
import EditCardCardio from './EditCardCardio.js';
import EditCardDentist from './EditCardDentist.js';
import EditCardTherapist from './EditCardTherapist.js';

class EditCardButton {
  getCard() {
    document.querySelector('.visit__cards').addEventListener('click', (e) => {
      if (e.target.classList.contains('cards__btn-edit')) {
        this.getApiCard(e.target.dataset.id);
      }
      if (document.querySelector('.form__create-information')) {
        document.querySelector('.form__create-information').remove();
      }
    });
    return;
  }

  async getApiCard(id) {
    const res = await fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const card = await res.json();
    const data = await card;
    this.selectVisitForm(data, data.doctor);
  }

  selectVisitForm(data, value) {
    switch (value) {
      case 'Dentist':
        const editCardDentist = new EditCardDentist();
        editCardDentist.render(data);
        break;

      case 'Cardiologist':
        const editCardCardio = new EditCardCardio();
        editCardCardio.render(data);
        break;

      case 'Therapist':
        const editCardTherapist = new EditCardTherapist();
        editCardTherapist.render(data);
        break;

      default:
        break;
    }
  }

  render() {
    this.getCard();
  }
}

export default EditCardButton;
