import Component from '@ember/component';
import {
  action,
} from '@ember-decorators/object';
import ModalMixin from '../../mixins/modal';
import {closeModal} from '../../helpers/close-modal';
import {service} from '@ember-decorators/service';

export default class extends Component.extend(ModalMixin, {}) {
  @service store;

  @action
  async onSubmitAction({id, name}) {
    const existingController = this.get('store').peekRecord('controller', id);
    if (existingController && existingController.get('object')) {
      alert('Этот контроллер уже активирован');
      return;
    }

    this.set('loading', true);
    const controller = this.get('store').createRecord('controller', {id, name, object: this.get('object')});

    try {
      await controller.save();
    } catch (e) {
      alert('Не удаётся активировать контроллер с данным идентификатором');
      console.log(e);
      return;
    } finally {
      this.set('loading', false);
    }

    this.onSuccess && this.onSuccess(controller);
    closeModal(this.get('modalId'));
  }
}
