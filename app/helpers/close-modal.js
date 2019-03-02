import {helper} from '@ember/component/helper';

export function closeModal(modalId) {
  const application = window.App.lookup('controller:application');

  application.closeModal(modalId);
}

export default helper(function([modalId]) {
  const application = window.App.lookup('controller:application');

  return function() {
    application.closeModal(modalId);
  };
});
