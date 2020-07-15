import { loc } from 'okta';
import { FORMS as RemediationForms } from '../../ion/RemediationConstants';

const ENROLLED_PASSWORD_RECOVERY_LINK = 'currentAuthenticatorEnrollment-recover';
const ORG_PASSWORD_RECOVERY_LINK = 'currentAuthenticator-recover';

const getSwitchAuthenticatorLink = (appState) => {
  if (appState.hasRemediationObject('select-factor-authenticate')) {
    return [
      {
        'type': 'link',
        'label':  loc('mfa.switch', 'login'),
        'name': 'switchFactor',
        'formName': 'select-factor-authenticate',
      }
    ];
  }

  if (appState.hasRemediationObject(RemediationForms.SELECT_AUTHENTICATOR_AUTHENTICATE)) {
    return [
      {
        'type': 'link',
        'label':  loc('oie.switch.authenticator', 'login'),
        'name': 'switchAuthenticator',
        'formName': RemediationForms.SELECT_AUTHENTICATOR_AUTHENTICATE,
      }
    ];
  }

  return [];
};

const getForgotPasswordLink = (appState, settings) => {
  const forgotPasswordLink = {
    'type': 'link',
    'label': loc('forgotpassword', 'login'),
    'name': 'forgot-password',
  };

  const customForgotPasswordHref = settings.get('helpLinks.forgotPassword');

  // at identify page when only Org Authenticator Password may be available
  if (appState.getActionByPath(ORG_PASSWORD_RECOVERY_LINK)) {
    if (customForgotPasswordHref) {
      return [
        Object.assign({}, {
          'href': customForgotPasswordHref,
          'label': loc('forgotpassword', 'login'),
          'name': 'forgot-password',
        }),
      ];
    } else {
      return [
        Object.assign({}, forgotPasswordLink, { actionPath: ORG_PASSWORD_RECOVERY_LINK }),
      ];
    }
  }
  // at password verify page
  else if (appState.getActionByPath(ENROLLED_PASSWORD_RECOVERY_LINK)) {
    if (customForgotPasswordHref) {
      return [
        Object.assign({}, {
          'href': customForgotPasswordHref,
          'label': loc('forgotpassword', 'login'),
          'name': 'forgot-password',
        }),
      ];
    } else {
      return [
        Object.assign({}, forgotPasswordLink, { actionPath: ENROLLED_PASSWORD_RECOVERY_LINK }),
      ];
    }
  }
  else {
    return [];
  }
};

const goBackLink = (appState) => {
  if (appState.hasRemediationObject(RemediationForms.SELECT_AUTHENTICATOR_ENROLL)) {
    return [
      {
        'type': 'link',
        'label':  loc('oie.go.back', 'login'),
        'name': 'go-back',
        'formName': RemediationForms.SELECT_AUTHENTICATOR_ENROLL,
      }
    ];
  }

  return [];
};

const getSignOutLink  = (settings) => {
  if (settings && settings.get('signOutLink')) {
    return [
      {
        'label': loc('signout', 'login'),
        'name': 'cancel',
        'href': settings.get('signOutLink')
      },
    ];
  } else {  return [
    {
      'actionPath': 'cancel',
      'label': loc('signout', 'login'),
      'name': 'cancel',
      'type': 'link'
    },
  ];
  }
};

export {
  getSwitchAuthenticatorLink,
  getForgotPasswordLink,
  goBackLink,
  getSignOutLink
};
