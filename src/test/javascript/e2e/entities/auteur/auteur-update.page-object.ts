import { element, by, ElementFinder } from 'protractor';

export default class AuteurUpdatePage {
  pageTitle: ElementFinder = element(by.id('calBiblioApp.auteur.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nomInput: ElementFinder = element(by.css('input#auteur-nom'));
  ageInput: ElementFinder = element(by.css('input#auteur-age'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNomInput(nom) {
    await this.nomInput.sendKeys(nom);
  }

  async getNomInput() {
    return this.nomInput.getAttribute('value');
  }

  async setAgeInput(age) {
    await this.ageInput.sendKeys(age);
  }

  async getAgeInput() {
    return this.ageInput.getAttribute('value');
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
