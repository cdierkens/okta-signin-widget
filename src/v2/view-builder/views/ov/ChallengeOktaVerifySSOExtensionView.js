import BaseAuthenticatorView from '../../components/BaseAuthenticatorView';
import { BaseForm } from '../../internals';
import { loc, createCallout } from 'okta';
import { OV_UV_ENABLE_BIOMETRICS_FASTPASS_DESKTOP, 
  OV_UV_ENABLE_BIOMETRICS_FASTPASS_MOBILE } from '../../utils/Constants';

// for EA,
// redirect is needed for Apple SSO Extension to intercept the request, because
// - XHR request is not interceptable
// - form post is interceptable, but some app (Outlook) closes the app after
// We may have a different approach/UX for GA
const Body = BaseForm.extend({
  noButtonBar: true,

  className: 'ion-form device-challenge-poll',

  title() {
    return loc('deviceTrust.sso.redirectText', 'login');
  },

  initialize() {
    BaseForm.prototype.initialize.apply(this, arguments);

    this.listenTo(this.model, 'error', () => {
      this.$('.spinner').hide();
    });
    this.add('<div class="credential-sso-extension"><div class="spinner"></div></div>');

    const isGetMethod = this.options.currentViewState?.method?.toLowerCase() === 'get';
    this.model.set('useRedirect', isGetMethod);
    this.trigger('save', this.model);
  },

  showCustomFormErrorCallout(error) {
    const errorSummaryKeys = error?.responseJSON?.errorSummaryKeys;
    const isBiometricsRequiredMobile = errorSummaryKeys 
        && errorSummaryKeys.includes(OV_UV_ENABLE_BIOMETRICS_FASTPASS_MOBILE);
    const isBiometricsRequiredDesktop = errorSummaryKeys 
        && errorSummaryKeys.includes(OV_UV_ENABLE_BIOMETRICS_FASTPASS_DESKTOP);

    if (isBiometricsRequiredMobile || isBiometricsRequiredDesktop) {
      const bulletPoints = [
        loc('oie.authenticator.oktaverify.method.fastpass.verify.enable.biometrics.point1', 'login'),
        loc('oie.authenticator.oktaverify.method.fastpass.verify.enable.biometrics.point2', 'login'),
        loc('oie.authenticator.oktaverify.method.fastpass.verify.enable.biometrics.point3', 'login')
      ];

      // Add an additional bullet point for desktop devices
      if (isBiometricsRequiredDesktop) {
        bulletPoints.push(
          loc('oie.authenticator.oktaverify.method.fastpass.verify.enable.biometrics.point4', 'login')
        );
      }

      const options = {
        type: 'error',
        className: 'okta-verify-uv-callout-content',
        title: loc('oie.authenticator.oktaverify.method.fastpass.verify.enable.biometrics.title', 'login'),
        subtitle: loc('oie.authenticator.oktaverify.method.fastpass.verify.enable.biometrics.description', 'login'),
        bullets: bulletPoints,
      };
      this.showMessages(createCallout(options));
      return true;
    }
  },
});

export default BaseAuthenticatorView.extend({
  Body,
});
