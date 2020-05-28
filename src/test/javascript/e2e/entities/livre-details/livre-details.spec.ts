import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import LivreDetailsComponentsPage, { LivreDetailsDeleteDialog } from './livre-details.page-object';
import LivreDetailsUpdatePage from './livre-details-update.page-object';
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

describe('LivreDetails e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let livreDetailsComponentsPage: LivreDetailsComponentsPage;
  let livreDetailsUpdatePage: LivreDetailsUpdatePage;
  /* let livreDetailsDeleteDialog: LivreDetailsDeleteDialog; */
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

  it('should load LivreDetails', async () => {
    await navBarPage.getEntityPage('livre-details');
    livreDetailsComponentsPage = new LivreDetailsComponentsPage();
    expect(await livreDetailsComponentsPage.title.getText()).to.match(/Livre Details/);

    expect(await livreDetailsComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([livreDetailsComponentsPage.noRecords, livreDetailsComponentsPage.table]);

    beforeRecordsCount = (await isVisible(livreDetailsComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(livreDetailsComponentsPage.table);
  });

  it('should load create LivreDetails page', async () => {
    await livreDetailsComponentsPage.createButton.click();
    livreDetailsUpdatePage = new LivreDetailsUpdatePage();
    expect(await livreDetailsUpdatePage.getPageTitle().getAttribute('id')).to.match(/calBiblioApp.livreDetails.home.createOrEditLabel/);
    await livreDetailsUpdatePage.cancel();
  });

  /*  it('should create and save LivreDetails', async () => {
        await livreDetailsComponentsPage.createButton.click();
        await livreDetailsUpdatePage.setDateCreationInput('01-01-2001');
        expect(await livreDetailsUpdatePage.getDateCreationInput()).to.eq('2001-01-01');
        await livreDetailsUpdatePage.setDerniereDateEditionInput('01-01-2001');
        expect(await livreDetailsUpdatePage.getDerniereDateEditionInput()).to.eq('2001-01-01');
        await livreDetailsUpdatePage.livreSelectLastOption();
        await waitUntilDisplayed(livreDetailsUpdatePage.saveButton);
        await livreDetailsUpdatePage.save();
        await waitUntilHidden(livreDetailsUpdatePage.saveButton);
        expect(await isVisible(livreDetailsUpdatePage.saveButton)).to.be.false;

        expect(await livreDetailsComponentsPage.createButton.isEnabled()).to.be.true;

        await waitUntilDisplayed(livreDetailsComponentsPage.table);

        await waitUntilCount(livreDetailsComponentsPage.records, beforeRecordsCount + 1);
        expect(await livreDetailsComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
    }); */

  /*  it('should delete last LivreDetails', async () => {

        const deleteButton = livreDetailsComponentsPage.getDeleteButton(livreDetailsComponentsPage.records.last());
        await click(deleteButton);

        livreDetailsDeleteDialog = new LivreDetailsDeleteDialog();
        await waitUntilDisplayed(livreDetailsDeleteDialog.deleteModal);
        expect(await livreDetailsDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/calBiblioApp.livreDetails.delete.question/);
        await livreDetailsDeleteDialog.clickOnConfirmButton();

        await waitUntilHidden(livreDetailsDeleteDialog.deleteModal);

        expect(await isVisible(livreDetailsDeleteDialog.deleteModal)).to.be.false;

        await waitUntilAnyDisplayed([livreDetailsComponentsPage.noRecords,
        livreDetailsComponentsPage.table]);
    
        const afterCount = await isVisible(livreDetailsComponentsPage.noRecords) ? 0 : await getRecordsCount(livreDetailsComponentsPage.table);
        expect(afterCount).to.eq(beforeRecordsCount);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
