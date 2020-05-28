import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AuteurComponentsPage, { AuteurDeleteDialog } from './auteur.page-object';
import AuteurUpdatePage from './auteur-update.page-object';
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

describe('Auteur e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let auteurComponentsPage: AuteurComponentsPage;
  let auteurUpdatePage: AuteurUpdatePage;
  let auteurDeleteDialog: AuteurDeleteDialog;
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

  it('should load Auteurs', async () => {
    await navBarPage.getEntityPage('auteur');
    auteurComponentsPage = new AuteurComponentsPage();
    expect(await auteurComponentsPage.title.getText()).to.match(/Auteurs/);

    expect(await auteurComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([auteurComponentsPage.noRecords, auteurComponentsPage.table]);

    beforeRecordsCount = (await isVisible(auteurComponentsPage.noRecords)) ? 0 : await getRecordsCount(auteurComponentsPage.table);
  });

  it('should load create Auteur page', async () => {
    await auteurComponentsPage.createButton.click();
    auteurUpdatePage = new AuteurUpdatePage();
    expect(await auteurUpdatePage.getPageTitle().getAttribute('id')).to.match(/calBiblioApp.auteur.home.createOrEditLabel/);
    await auteurUpdatePage.cancel();
  });

  it('should create and save Auteurs', async () => {
    await auteurComponentsPage.createButton.click();
    await auteurUpdatePage.setNomInput('nom');
    expect(await auteurUpdatePage.getNomInput()).to.match(/nom/);
    await auteurUpdatePage.setAgeInput('5');
    expect(await auteurUpdatePage.getAgeInput()).to.eq('5');
    await waitUntilDisplayed(auteurUpdatePage.saveButton);
    await auteurUpdatePage.save();
    await waitUntilHidden(auteurUpdatePage.saveButton);
    expect(await isVisible(auteurUpdatePage.saveButton)).to.be.false;

    expect(await auteurComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(auteurComponentsPage.table);

    await waitUntilCount(auteurComponentsPage.records, beforeRecordsCount + 1);
    expect(await auteurComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Auteur', async () => {
    const deleteButton = auteurComponentsPage.getDeleteButton(auteurComponentsPage.records.last());
    await click(deleteButton);

    auteurDeleteDialog = new AuteurDeleteDialog();
    await waitUntilDisplayed(auteurDeleteDialog.deleteModal);
    expect(await auteurDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/calBiblioApp.auteur.delete.question/);
    await auteurDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(auteurDeleteDialog.deleteModal);

    expect(await isVisible(auteurDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([auteurComponentsPage.noRecords, auteurComponentsPage.table]);

    const afterCount = (await isVisible(auteurComponentsPage.noRecords)) ? 0 : await getRecordsCount(auteurComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
