import { element, by, ElementFinder } from 'protractor';

export default class LivreUpdatePage {
  pageTitle: ElementFinder = element(by.id('calBiblioApp.livre.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  iSBNInput: ElementFinder = element(by.css('input#livre-iSBN'));
  nomInput: ElementFinder = element(by.css('input#livre-nom'));
  maisonEditionInput: ElementFinder = element(by.css('input#livre-maisonEdition'));
  emprunteParSelect: ElementFinder = element(by.css('select#livre-empruntePar'));
  auteurSelect: ElementFinder = element(by.css('select#livre-auteur'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setISBNInput(iSBN) {
    await this.iSBNInput.sendKeys(iSBN);
  }

  async getISBNInput() {
    return this.iSBNInput.getAttribute('value');
  }

  async setNomInput(nom) {
    await this.nomInput.sendKeys(nom);
  }

  async getNomInput() {
    return this.nomInput.getAttribute('value');
  }

  async setMaisonEditionInput(maisonEdition) {
    await this.maisonEditionInput.sendKeys(maisonEdition);
  }

  async getMaisonEditionInput() {
    return this.maisonEditionInput.getAttribute('value');
  }

  async emprunteParSelectLastOption() {
    await this.emprunteParSelect.all(by.tagName('option')).last().click();
  }

  async emprunteParSelectOption(option) {
    await this.emprunteParSelect.sendKeys(option);
  }

  getEmprunteParSelect() {
    return this.emprunteParSelect;
  }

  async getEmprunteParSelectedOption() {
    return this.emprunteParSelect.element(by.css('option:checked')).getText();
  }

  async auteurSelectLastOption() {
    await this.auteurSelect.all(by.tagName('option')).last().click();
  }

  async auteurSelectOption(option) {
    await this.auteurSelect.sendKeys(option);
  }

  getAuteurSelect() {
    return this.auteurSelect;
  }

  async getAuteurSelectedOption() {
    return this.auteurSelect.element(by.css('option:checked')).getText();
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
