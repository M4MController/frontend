import {helper} from '@ember/component/helper';

export function openModal(modalName, params) {
  const application = window.App.lookup('controller:application');

  application.openModal(modalName, params);
}

export default helper(function([modalName], params) {
  const application = window.App.lookup('controller:application');

  return function() {
    application.openModal(modalName, params);
  };
});
