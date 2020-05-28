import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import LivreComponentsPage, { LivreDeleteDialog } from './livre.page-object';
import LivreUpdatePage from './livre-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('Livre e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let livreComponentsPage: LivreComponentsPage;
  let livreUpdatePage: LivreUpdatePage;
  let livreDeleteDialog: LivreDeleteDialog;
  let beforeRecordsCount = 0;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  it('should load Livres', async () => {
    await navBarPage.getEntityPage('livre');
    livreComponentsPage = new LivreComponentsPage();
    expect(await livreComponentsPage.title.getText()).to.match(/Livres/);

    expect(await livreComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([livreComponentsPage.noRecords, livreComponentsPage.table]);

    beforeRecordsCount = (await isVisible(livreComponentsPage.noRecords)) ? 0 : await getRecordsCount(livreComponentsPage.table);
  });

  it('should load create Livre page', async () => {
    await livreComponentsPage.createButton.click();
    livreUpdatePage = new LivreUpdatePage();
    expect(await livreUpdatePage.getPageTitle().getAttribute('id')).to.match(/calBiblioApp.livre.home.createOrEditLabel/);
    await livreUpdatePage.cancel();
  });

  it('should create and save Livres', async () => {
    await livreComponentsPage.createButton.click();
    await livreUpdatePage.setISBNInput('iSBN');
    expect(await livreUpdatePage.getISBNInput()).to.match(/iSBN/);
    await livreUpdatePage.setNomInput('nom');
    expect(await livreUpdatePage.getNomInput()).to.match(/nom/);
    await livreUpdatePage.setMaisonEditionInput('maisonEdition');
    expect(await livreUpdatePage.getMaisonEditionInput()).to.match(/maisonEdition/);
    await livreUpdatePage.emprunteParSelectLastOption();
    // livreUpdatePage.auteurSelectLastOption();
    await waitUntilDisplayed(livreUpdatePage.saveButton);
    await livreUpdatePage.save();
    await waitUntilHidden(livreUpdatePage.saveButton);
    expect(await isVisible(livreUpdatePage.saveButton)).to.be.false;

    expect(await livreComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(livreComponentsPage.table);

    await waitUntilCount(livreComponentsPage.records, beforeRecordsCount + 1);
    expect(await livreComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Livre', async () => {
    const deleteButton = livreComponentsPage.getDeleteButton(livreComponentsPage.records.last());
    await click(deleteButton);

    livreDeleteDialog = new LivreDeleteDialog();
    await waitUntilDisplayed(livreDeleteDialog.deleteModal);
    expect(await livreDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/calBiblioApp.livre.delete.question/);
    await livreDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(livreDeleteDialog.deleteModal);

    expect(await isVisible(livreDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([livreComponentsPage.noRecords, livreComponentsPage.table]);

    const afterCount = (await isVisible(livreComponentsPage.noRecords)) ? 0 : await getRecordsCount(livreComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
