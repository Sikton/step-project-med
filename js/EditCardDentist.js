import EditCard from './EditCard.js';

class EditCardDentist extends EditCard {
  createForm(card) {
    super.createForm(card);
    const formContent = document.querySelector('.form__create-information');
    formContent.insertAdjacentHTML(
      'beforeend',
      `
    <label>Date of last visit</label>
    <input
      class="last-visit"
      name="lastVisit"
      placeholder="Date of last visit:"
      type="date"
      required="required"
      value="${card.lastVisit}"
    />
    <textarea
      class="description"
      name="description"
      placeholder="Description of the visit"
    >${card.description}</textarea>
    <input type="submit" class="form__edit-submit" value="Edit Card" />

    `
    );
  }

  render(card) {
    this.createForm(card);
  }
}

export default EditCardDentist;
