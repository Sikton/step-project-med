import EditCard from './EditCard.js';

class EditCardCardio extends EditCard {
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

      <input
        class="pressure"
        name="pressure"
        placeholder="Normal pressure"
        required="required"
        value="${card.pressure}"
      />
      <input
        class="bodyIndex"
        name="bodyIndex"
        placeholder="Body mass index"
        type="number"
        required="required"
        value="${card.bodyIndex}"
      />
      <input
        class="diseases"
        name="diseases"
        placeholder="A history of cardiovascular disease?"
        required="required"
        value="${card.diseases}"
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

export default EditCardCardio;
