import Component from '@ember/component';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';
import ModalMixin from '../../mixins/modal';
import {closeModal} from '../../helpers/close-modal';

export default class extends Component.extend(ModalMixin, {}) {
  @service store;

  @action
  async onSubmitAction({name}) {
    this.set('loading', true);
    const object = this.get('store').createRecord('object', {name});

    try {
      await object.save();
    } catch (e) {
      alert('Ошибка создания объекта.');
      return;
    } finally {
      this.set('loading', false);
    }

    this.onSuccess && this.onSuccess(object);
    closeModal(this.get('modalId'));
  }
}
