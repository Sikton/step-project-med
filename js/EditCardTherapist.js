import EditCard from './EditCard.js';

class EditCardTherapist extends EditCard {
  createForm(card) {
    super.createForm(card);
    const formContent = document.querySelector('.form__create-information');
    formContent.insertAdjacentHTML(
      'beforeend',
      `
        <input
        class="age"
        name="age"
        placeholder="Age"
        type="number"
        required="required"
        value="${card.age}"
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

export default EditCardTherapist;
