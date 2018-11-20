import Mixin from '@ember/object/mixin';
import {action} from '@ember-decorators/object';

export default Mixin.create({
  @action
  onCloseAction() {
    this.attrs.onClose && this.attrs.onClose();
  },
});
