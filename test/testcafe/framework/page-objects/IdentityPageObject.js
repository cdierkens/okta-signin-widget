import { Selector } from 'testcafe';
import BasePageObject from './BasePageObject';

const CALLOUT_SELECTOR = '.infobox-warning > div';
const ENROLL_SELECTOR = 'a[data-se="enroll"]';
const NEEDHELP_SELECTOR = 'a[data-se="help"]';
const FORGOT_PASSWORD_SELECTOR = 'a[data-se="forgot-password"]';
const CUSTOM_CHECKBOX_SELECTOR = '.custom-checkbox';
const REMEMBER_ME_FIELD_NAME = 'rememberMe';
const CUSTOM_HELP_LINK_SELECTOR = '.auth-footer .js-help';
const CUSTOM_HELP_LINKS_SELECTOR = '.auth-footer .js-custom';
const CUSTOM_BUTTON = '.custom-buttons .okta-custom-buttons-container .default-custom-button';
const UNLOCK_ACCOUNT = '.auth-footer .js-unlock';
const SUB_LABEL_SELECTOR = '.o-form-explain';

export default class IdentityPageObject extends BasePageObject {
  constructor(t) {
    super(t);
  }

  getPageTitle() {
    return this.form.getElement('.okta-form-title').textContent;
  }

  getOktaVerifyButtonText() {
    return this.form.getElement('.sign-in-with-device-option .okta-verify-container .link-button').textContent;
  }

  getRememberMeText() {
    return this.form.getElement(CUSTOM_CHECKBOX_SELECTOR).textContent;
  }

  getRememberMeValue() {
    return this.form.getCheckboxValue(REMEMBER_ME_FIELD_NAME);
  }

  checkRememberMe() {
    return this.form.setCheckbox(REMEMBER_ME_FIELD_NAME, true);
  }

  getSignupLinkText() {
    return Selector(ENROLL_SELECTOR).textContent;
  }

  getNeedhelpLinkText() {
    return Selector(NEEDHELP_SELECTOR).textContent;
  }

  getForgotPasswordLinkText() {
    return Selector(FORGOT_PASSWORD_SELECTOR).textContent;
  }

  getUnlockAccountLinkText() {
    return Selector(UNLOCK_ACCOUNT).textContent;
  }

  async hasForgotPasswordLinkText() {
    const elCount = await Selector(FORGOT_PASSWORD_SELECTOR).count;
    return elCount === 1;
  }

  async clickOktaVerifyButton() {
    await this.t.click(Selector('.sign-in-with-device-option .okta-verify-container .link-button'));
  }

  getSeparationLineText() {
    return this.form.getElement('.sign-in-with-device-option .separation-line').textContent;
  }

  fillIdentifierField(value) {
    return this.form.setTextBoxValue('identifier', value);
  }

  getIdentifierValue() {
    return this.form.getTextBoxValue('identifier');
  }

  fillPasswordField(value) {
    return this.form.setTextBoxValue('credentials.passcode', value);
  }

  async hasShowTogglePasswordIcon() {
    return await Selector('.password-toggle').count;
  }

  clickNextButton() {
    return this.form.clickSaveButton();
  }

  waitForErrorBox() {
    return this.form.waitForErrorBox();
  }

  getGlobalErrors() {
    return this.form.getErrorBoxText();
  }

  waitForIdentifierError() {
    return this.form.waitForTextBoxError('identifier');
  }

  hasIdentifierError() {
    return this.form.hasTextBoxError('identifier');
  }

  hasIdentifierErrorMessage() {
    return this.form.hasTextBoxErrorMessage('identifier');
  }

  hasCallout() {
    return !this.form.getCallout(CALLOUT_SELECTOR);
  }

  getUnknownUserCalloutContent() {
    return this.form.getCallout(CALLOUT_SELECTOR).textContent;
  }

  getIdpButton(selector) {
    return this.form.getCallout(selector);
  }

  clickIdpButton(selector) {
    return this.form.clickElement(selector);
  }

  identifierFieldExists(selector) {
    return this.form.elementExist(selector);
  }

  getCustomForgotPasswordLink() {
    return Selector(FORGOT_PASSWORD_SELECTOR).getAttribute('href');
  }

  getCustomHelpLink() {
    return Selector(CUSTOM_HELP_LINK_SELECTOR).getAttribute('href');
  }

  getCustomHelpLinks(index) {
    return Selector(CUSTOM_HELP_LINKS_SELECTOR).nth(index).getAttribute('href');
  }

  getCustomHelpLinksLabel(index) {
    return Selector(CUSTOM_HELP_LINKS_SELECTOR).nth(index).textContent;
  }

  async clickCustomButtonLink(index) {
    await this.t.click(Selector(CUSTOM_BUTTON).nth(index));
  }

  getCustomButtonText(index) {
    return Selector(CUSTOM_BUTTON).nth(index).textContent;
  }

  async clickSignUpLink() {
    await this.t.click(Selector(ENROLL_SELECTOR));
  }

  async clickUnlockAccountLink() {
    await this.t.click(Selector(UNLOCK_ACCOUNT));
  }

  getCustomUnlockAccountLink() {
    return Selector(UNLOCK_ACCOUNT).getAttribute('href');
  }

  getIdentifierSubLabelValue() {
    return Selector(SUB_LABEL_SELECTOR).nth(0).textContent;
  }

  getPasswordSubLabelValue() {
    return Selector(SUB_LABEL_SELECTOR).nth(1).textContent;
  }
}
