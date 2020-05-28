import { element, by, ElementFinder } from 'protractor';

export default class LivreDetailsUpdatePage {
  pageTitle: ElementFinder = element(by.id('calBiblioApp.livreDetails.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  dateCreationInput: ElementFinder = element(by.css('input#livre-details-dateCreation'));
  derniereDateEditionInput: ElementFinder = element(by.css('input#livre-details-derniereDateEdition'));
  livreSelect: ElementFinder = element(by.css('select#livre-details-livre'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDateCreationInput(dateCreation) {
    await this.dateCreationInput.sendKeys(dateCreation);
  }

  async getDateCreationInput() {
    return this.dateCreationInput.getAttribute('value');
  }

  async setDerniereDateEditionInput(derniereDateEdition) {
    await this.derniereDateEditionInput.sendKeys(derniereDateEdition);
  }

  async getDerniereDateEditionInput() {
    return this.derniereDateEditionInput.getAttribute('value');
  }

  async livreSelectLastOption() {
    await this.livreSelect.all(by.tagName('option')).last().click();
  }

  async livreSelectOption(option) {
    await this.livreSelect.sendKeys(option);
  }

  getLivreSelect() {
    return this.livreSelect;
  }

  async getLivreSelectedOption() {
    return this.livreSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
