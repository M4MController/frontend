import Controller from '@ember/controller';

export default class extends Controller {
  __modals = [];

  openModal(modalName, params) {
    const modalId = this.get('__modals.length');
    this.get('__modals').pushObject(Object.create({modalName, params, id: modalId}));
    return modalId;
  }

  closeModal(modalId) {
    const modals = this.get('__modals');
    modals.removeObject(modals.findBy('id', modalId));
  }
}
